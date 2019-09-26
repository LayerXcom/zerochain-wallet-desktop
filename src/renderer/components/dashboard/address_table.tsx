import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface IDashboardState {
    wallets: zfaceHelper.WalletInfo[];
}

export default class AddressTable extends React.Component<{}, IDashboardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          wallets: [],
        };
        this.getWalletList = this.getWalletList.bind(this);
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
                        </tr>
                        {this.state.wallets.map((wallet) =>
                            <tr key={wallet.name}>
                                <td>
                                    { wallet.isDefault && <div className="font-weight-bold">*{wallet.name}</div> }
                                    { !wallet.isDefault && <div>{wallet.name}</div> }
                                </td>
                                <td>{wallet.address}</td>
                                <td><i className="far fa-copy"></i></td>
                            </tr>,
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    public componentDidMount(): void {
        this.getWalletList();
    }

    public getWalletList(): void {
        try {
            const walletList = zfaceHelper.getWalletList();
            this.setState({
                wallets: walletList,
            });
        } catch (error) {
            alert(error.message);
        }
    }

}
