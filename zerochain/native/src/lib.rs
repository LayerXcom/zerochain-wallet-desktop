#[macro_use]
extern crate neon;
extern crate dirs;
use neon::prelude::*;
use zface::wallet::config::INDEXFILE;
mod helper;

fn new_wallet(mut cx: FunctionContext) -> JsResult<JsString> {
    if !wallet_exist() {
        let new_address = helper::new_wallet().unwrap();
        Ok(cx.string(new_address))
    } else {
        panic!("Wallet already exists!");
    }
}

fn wallet_exist() -> bool {
    let wallet_path = dirs::data_local_dir().unwrap();
    wallet_path.join("zface").join(INDEXFILE).exists()
}

register_module!(mut m, {
    m.export_function("new_wallet", new_wallet)?;
    Ok(())
});
