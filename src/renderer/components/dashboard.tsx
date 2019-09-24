import React from 'react';
import * as zfaceHelper from '../zface_helper';

interface IDashboardState {
    balance: number;
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

export default class Dashboard extends React.Component<{}, IDashboardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          balance: 0,
          wallets: [],
        };
        this.get_balance = this.get_balance.bind(this);
        this.update_to_latest = this.update_to_latest.bind(this);
        this.get_wallet_list = this.get_wallet_list.bind(this);
    }
    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Dashboard</h1>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <span className="small">Current Balance:</span>
                                        <div className="total-balance">
                                            {this.state.balance}<span className="unit">ZLX</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
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
                                    <td>{this.state.balance} ZLX</td>
                                  </tr>,
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    public get_balance(): void {
        try {
            const balance = zfaceHelper.get_balance();
            this.setState({balance});
        } catch (error) {
            alert(error.message);
        }
    }

    public update_to_latest(): void {
        this.get_balance();
    }

    public componentDidMount(): void {
        this.update_to_latest();
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
