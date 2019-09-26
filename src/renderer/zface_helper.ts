const zerochain = require('zerochain');

export class WalletInfo {
    public name: string;
    public address: string;
    public isDefault: boolean;

    public constructor(name: string, address: string, isDefault: boolean) {
        this.name = name;
        this.address = address;
        this.isDefault = isDefault;
    }
}

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
    const walletList = zerochain.get_wallet_list();
    walletList.sort((w1: WalletInfo, w2: WalletInfo) => {
        const name1 = w1.name;
        const name2 = w2.name;
        if (w1.isDefault) {
            return -1;
        }
        if (name1 < name2) {
            return -1;
        }
        if (name1 > name2) {
            return 1;
        }
        return 0;
    });
    return walletList;
}

export function recover(phrases: Array<string>) {
    const phraseStr = phrases.join(' ');  // white spaces are required.
    return zerochain.recover(phraseStr);
}
