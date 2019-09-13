use rand::{OsRng, Rng};
use zface::{config, term, wallet::*, error::Result, derive::*, transaction::*};
use zface::wallet::{
    config::*,
    commands::{
        Mnemonic, MnemonicType, Language, Seed, wallet_keystore_dirs, new_indexfile
    }
};
use polkadot_rs::Url;

const TEST_PASSWORD: &'static str = "zerochain";
const TEST_ACCOUNTNAME: &'static str = "zerochain";
const CONF_PK_PATH: &'static str = "./params/conf_pk.dat";
const CONF_VK_PATH: &'static str = "./params/conf_vk.dat";
const FEE: u32 = 1;

// Initialize a new wallet. Returning a generated address encoded by SS58 format.
pub fn new_wallet() -> Result<String> {
    let rng = &mut OsRng::new().expect("should be able to construct RNG");
    let root_dir = config::get_default_root_dir();

    // 1. configure wallet directory
    let (wallet_dir, keystore_dir) = wallet_keystore_dirs(&root_dir)?;

    // 2. generate the mnemonics
    let mnemonic = Mnemonic::new(MnemonicType::Words12, Language::English);
    let phrase = mnemonic.phrase();

    // 3. create master keyfile
    let master_seed = Seed::new(&mnemonic, "");
    let master_seed_bytes: &[u8] = master_seed.as_bytes();
    let password = TEST_PASSWORD.as_bytes();
    let mut keyfile_master = KeyFile::create_master(MASTER_ACCOUNTNAME, VERSION, password, ITERS, rng, master_seed_bytes)?;

    // 4. store master keyfile
    wallet_dir.insert_master(&mut keyfile_master)?;

    // 5. create a genesis keyfile
    let child_index = ChildIndex::from_index(0);
    let mut keyfile = get_new_keyfile(rng, password, &wallet_dir, child_index)?;

    // 6. store a genesis keyfile
    keystore_dir.insert(&mut keyfile, rng)?;

    // 7. store new indexfile
    let file_name = keyfile.file_name.expect("Filename should be set.");
    new_indexfile(&wallet_dir, &file_name, &keyfile.account_name)?;

    Ok(keyfile.ss58_address)
}

// Generate a extrinsic to send confidential transactions.
pub fn gen_tx(recipient_addr: Vec<u8>, amount: u32) -> Result<()> {
    let rng = &mut OsRng::new().expect("should be able to construct RNG");
    let root_dir = config::get_default_root_dir();
    let spending_key = spending_key_from_keystore(root_dir, TEST_PASSWORD.as_bytes())?;
    let url = Url::Local;

    inner_confidential_transfer_tx(
        spending_key,
        &recipient_addr[..],
        amount,
        url,
        CONF_PK_PATH,
        CONF_VK_PATH,
        rng
    )
}

// =================
//  Inner functions
// =================

fn get_new_keyfile<R: Rng>(
    rng: &mut R,
    password: &[u8],
    wallet_dir: &WalletDirectory,
    child_index: ChildIndex,
) -> Result<KeyFile> {
    let master_keyfile = wallet_dir.load_master()?;
    let xsk_child = master_keyfile.get_child_xsk(&password[..], child_index)?;

    // create new keyfile
    let keyfile = KeyFile::new(
        TEST_ACCOUNTNAME,
        VERSION,
        password,
        ITERS,
        &xsk_child,
        rng
    )?;

    Ok(keyfile)
}

// fn inner_confidential_transfer_tx<R: Rng>(
//     spending_key: SpendingKey::<Bls12>,
//     recipient_enc_key: &[u8],
//     amount: u32,
//     current_balance: u32,
//     rng: &mut R,
// ) -> Result<()> {
//     let remaining_balance = current_balance - amount;
//     let recipient_account = EncryptionKey::<Bls12>::read(&mut &recipient_enc_key[..], &PARAMS)?;
//     let multi_keys = MultiEncKeys::<Bls12, Confidential>::new(recipient_account.clone());

//     KeyContext::read_from_path(CONF_PK_PATH, CONF_VK_PATH)?
//         .gen_proof(
//             amount,
//             FEE,
//             remaining_balance,
//             0,
//             0,
//             &spending_key,
//             multi_keys,
//             &enc_balance,
//             getter::g_epoch(&api)?,
//             rng,
//             &PARAMS
//         )?
// }

// fn g_epoch(current_height: String, epoch_length: String) -> Result<edwards::Point<Bls12, PrimeOrder>> {
//     let current_epoch = hexstr_to_u64(current_height_str) / hexstr_to_u64(epoch_length_str);
//     let g_epoch = GEpoch::group_hash(current_epoch as u32)?; // TODO

//     let point = edwards::Point::<Bls12, _>::read(&mut g_epoch.as_ref(), &PARAMS)?
//             .as_prime_order(&PARAMS)
//             .unwrap();

//     Ok(point)
// }
