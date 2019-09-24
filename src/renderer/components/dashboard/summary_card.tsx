import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface IDashboardState {
    balance: number;
}

export default class SummaryCard extends React.Component<{}, IDashboardState> {
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
