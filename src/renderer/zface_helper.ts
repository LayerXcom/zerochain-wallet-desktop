const zerochain = require('zerochain');

export function new_wallet() {
    const newAddress = zerochain.new_wallet();
    return newAddress;
}

export function get_balance() {
    return zerochain.get_balance();
}

export function submit_tx(recipientAddress: string, amount: number): void {
    zerochain.submit_tx(recipientAddress, amount);
}

export function get_wallet_list() {
    return zerochain.get_wallet_list();
}
