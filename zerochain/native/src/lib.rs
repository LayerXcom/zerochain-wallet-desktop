#[macro_use]
extern crate neon;
use neon::prelude::*;
mod helper;

fn get_cpu_num(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(num_cpus::get() as f64))
}

register_module!(mut m, {
    m.export_function("get_cpu_num", get_cpu_num)?;
    Ok(())
});
