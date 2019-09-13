use rand::{OsRng, Rng};
use zface::{config, term, wallet::*, error::Result, derive::*};
use zface::wallet::{
    config::*,
    commands::{
        Mnemonic, MnemonicType, Language, Seed, wallet_keystore_dirs, new_indexfile
    }
};

const TEST_PASSWORD: &'static str = "zerochain";
const TEST_ACCOUNTNAME: &'static str = "zerochain";

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
