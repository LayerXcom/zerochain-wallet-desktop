const zerochain = require('zerochain');

export function new_wallet() {
  try {
    const newAddress = zerochain.new_wallet();
    return newAddress;
  } catch (error) {
    return error.message;
  }
}
