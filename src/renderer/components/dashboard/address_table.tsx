import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface IDashboardState {
    wallets: WalletInfo[];
}

class WalletInfo {
    public name: string;
    public address: string;
    public isDefault: boolean;

    public constructor(name: string, address: string, isDefault: boolean) {
        this.name = name;
        this.address = address;
        this.isDefault = isDefault;
    }
}

export default class AddressTable extends React.Component<{}, IDashboardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          wallets: [],
        };
        this.get_wallet_list = this.get_wallet_list.bind(this);
    }
    public render() {
        return (
            <div>
                <h2>Your Adresses</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                            <th>Balance</th>
                        </tr>
                        {this.state.wallets.map((wallet) =>
                            <tr key={wallet.name}>
                            <td>
                            {
                                (() => {
                                if (wallet.isDefault) {
                                    return(
                                    <span className="font-weight-bold" style={{marginRight: '0.25rem'}}>*</span>
                                    );
                                }
                                })()
                            }
                                {wallet.name}
                            </td>
                            <td>{wallet.address}{wallet.isDefault}</td>
                            <td><i className="far fa-copy"></i></td>
                            <td>*** ZLX</td>
                            </tr>,
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    public componentDidMount(): void {
        this.get_wallet_list();
    }

    public get_wallet_list(): void {
        try {
            const walletList = zfaceHelper.get_wallet_list();
            this.setState({
                wallets: walletList,
            });
        } catch (error) {
            alert(error.message);
        }
    }

}
