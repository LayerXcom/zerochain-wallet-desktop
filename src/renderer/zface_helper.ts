const zerochain = require('zerochain');

export function add_account(accountName: string) {
    const newAddress = zerochain.add_account(accountName);
    return newAddress;
}

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

export function recover(phrases: Array<string>) {
    const phrase_str = phrases.join(' ');  // white spaces are required.
    return zerochain.recover(phrase_str);
}
