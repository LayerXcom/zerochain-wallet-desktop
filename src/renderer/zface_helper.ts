const zerochain = require('zerochain');

export function addAccount(accountName: string) {
    const newAddress = zerochain.add_account(accountName);
    return newAddress;
}

export function newWallet() {
    const newAddress = zerochain.new_wallet();
    return newAddress;
}

export function getBalance() {
    return zerochain.get_balance();
}

export function submitTx(recipientAddress: string, amount: number): void {
    zerochain.submit_tx(recipientAddress, amount);
}

export function getWalletList() {
    return zerochain.get_wallet_list();
}

export function recover(phrases: Array<string>) {
    const phraseStr = phrases.join(' ');  // white spaces are required.
    return zerochain.recover(phraseStr);
}
