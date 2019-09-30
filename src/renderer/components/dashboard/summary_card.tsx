import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface ISummaryCardProps {
    account: zfaceHelper.AccountInfo
}

interface ISummaryCardState {
    balance: number;
}

export default class SummaryCard extends React.Component<ISummaryCardProps, ISummaryCardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          balance: 0,
        };
        this.getBalance = this.getBalance.bind(this);
        this.updateToLatest = this.updateToLatest.bind(this);
    }
    public render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <span className="small">Current Address:</span>
                            <p>{this.props.account.address}</p>
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

    public getBalance(): void {
        try {
            const balance = zfaceHelper.getBalance();
            this.setState({balance});
        } catch (error) {
            alert(error.message);
        }
    }

    public updateToLatest(): void {
        this.getBalance();
    }

    public componentDidMount(): void {
        this.updateToLatest();
    }
}
