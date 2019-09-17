#[macro_use]
extern crate neon;
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

fn get_balance(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let balance = helper::get_balance();
    Ok(cx.number(balance as f64))
}

register_module!(mut m, {
    m.export_function("new_wallet", new_wallet)?;
    m.export_function("get_balance", get_balance)?;
    Ok(())
});
