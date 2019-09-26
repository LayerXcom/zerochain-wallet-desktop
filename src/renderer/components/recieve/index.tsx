import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as zfaceHelper from '../../zface_helper';

import NewAccount from './new_account';

interface IRecieve {
    wallets: zfaceHelper.WalletInfo[];
}

export default class Recieve extends React.Component<{}, IRecieve> {
    public constructor(props: any) {
        super(props);
        this.state = {
          wallets: [],
        };
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

    public render() {
        return (
            <div>
                <h1>Recieve</h1>
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
                            <td>{wallet.address}{wallet.isDefault}</td>
                            <td>
                                <CopyToClipboard text={wallet.address}>
                                    <a><i className="fas fa-copy fa-lg copy-icon"></i></a>
                                </CopyToClipboard>
                            </td>
                        </tr>,
                        )}
                    </tbody>
                </table>
                <NewAccount afterCreate={this.getWalletList.bind(this)} />
            </div>
        );
    }
}
