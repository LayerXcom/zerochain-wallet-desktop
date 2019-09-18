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

fn submit_tx(mut cx: FunctionContext) -> JsResult<JsNull> {
    let recipient_address = cx.argument::<JsString>(0)?.value();
    let amount = cx.argument::<JsNumber>(1)?.value();
    helper::submit_tx(&recipient_address, amount as u32);
    Ok(cx.null())
}

register_module!(mut m, {
    m.export_function("new_wallet", new_wallet)?;
    m.export_function("get_balance", get_balance)?;
    m.export_function("submit_tx", submit_tx)?;
    Ok(())
});
