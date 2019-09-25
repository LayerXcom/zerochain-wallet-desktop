#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;
#[macro_use]
extern crate serde_derive;

use neon::prelude::*;
use zface::wallet::config::INDEXFILE;
mod helper;

fn new_keyfile(mut cx: FunctionContext) -> JsResult<JsString> {
    let name = cx.argument::<JsString>(0)?.value();
    let new_address = helper::new_keyfile(&name).unwrap();
    Ok(cx.string(new_address))
}

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

fn get_wallet_list(mut cx: FunctionContext) -> JsResult<JsValue> {
    let value = helper::get_wallet_list().unwrap();
    let js_value = neon_serde::to_value(&mut cx, &value).unwrap();
    Ok(js_value)
}

fn recover(mut cx: FunctionContext) -> JsResult<JsString> {
    let phrase_str = cx.argument::<JsString>(0)?.value();
    let restored_address = helper::recover(&phrase_str).unwrap();
    Ok(cx.string(restored_address))
}

register_module!(mut m, {
    m.export_function("add_account", new_keyfile)?;
    m.export_function("new_wallet", new_wallet)?;
    m.export_function("get_balance", get_balance)?;
    m.export_function("get_wallet_list", get_wallet_list)?;
    m.export_function("recover", recover)?;
    m.export_function("submit_tx", submit_tx)?;
    Ok(())
});
