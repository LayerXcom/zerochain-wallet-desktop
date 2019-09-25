import React from 'react';
import * as zfaceHelper from '../../zface_helper';

import NewAccount from './new_account';

interface IRecieve {
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

export default class Recieve extends React.Component<{}, IRecieve> {
    public constructor(props: any) {
        super(props);
        this.state = {
          wallets: [],
        };
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
                            {
                                (() => {
                                if (wallet.isDefault) {
                                    return(
                                        <span
                                            className="font-weight-bold"
                                            style={{marginRight: '0.25rem'}}>
                                                *
                                        </span>
                                    );
                                }
                                })()
                            }
                                {wallet.name}
                            </td>
                            <td>{wallet.address}{wallet.isDefault}</td>
                            <td><i className="far fa-copy"></i></td>
                        </tr>,
                        )}
                    </tbody>
                </table>
                <NewAccount after_create={this.get_wallet_list.bind(this)} />
            </div>
        );
    }
}
