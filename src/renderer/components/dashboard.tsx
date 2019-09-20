import React from 'react';
import * as zfaceHelper from '../zface_helper';

interface IDashboardState {
    balance: number;
}

export default class Dashboard extends React.Component<{}, IDashboardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          balance: 0,
        };
        this.get_balance = this.get_balance.bind(this);
        this.update_to_latest = this.update_to_latest.bind(this);
      }
    public render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Dashboard</h1>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <span className="small">Current Balance:</span>
                                        <div className="total-balance">
                                            1000<span className="unit">ZLX</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>Latest Sync: 2019/06/19 12:00</p>
                                        <p>Block Height: #1398</p>
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
                                <tr>
                                    <td>default</td>
                                    <td>5CfUk1yfBAhMZvMyHCsuy93fGUxLGSm8BLFesNxqaygtuLoE</td>
                                    <td><i className="far fa-copy"></i></td>
                                    <td>14 ZLX</td>
                                </tr>
                                <tr>
                                    <td>sub_address</td>
                                    <td>5CfUk1yfBAhMZvMyHCsuy93fGUxLGSm8BLFesNxqaygtuLoE</td>
                                    <td><i className="far fa-copy"></i></td>
                                    <td>230 ZLX</td>
                                </tr>
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
    }

}
