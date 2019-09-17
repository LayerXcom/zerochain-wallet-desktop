const zerochain = require('zerochain');

export function new_wallet() {
  const newAddress = zerochain.new_wallet();
  return newAddress;
}

export function get_balance() {
  return zerochain.get_balance();
}
