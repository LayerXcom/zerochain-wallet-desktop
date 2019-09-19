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
            <div>
                <h2>Dashboard</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Wallet Summary</h5>
                        <p className="card-text">
                            <button onClick={this.update_to_latest}>update</button>
                            <p>balance: {this.state.balance}</p>
                        </p>
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
