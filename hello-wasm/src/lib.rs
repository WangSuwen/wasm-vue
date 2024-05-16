extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use enigo::{Enigo, Key, Settings, Direction};
use enigo::Keyboard;
#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(/* name: &str */) {
    // alert(&format!("你好呀, 我是WebAssembly ++--===--++ {}!", name));
    alert(&format!("你好呀, 我是WebAssembly"));
	let enigo = enigo::Enigo::new(&Settings::default());
    let mut eni = enigo.unwrap();
    let _ = eni.key(Key::Unicode('v'), Direction::Press);
}
