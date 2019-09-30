import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface ICurrentStatusStates {
    balance: number;
}

interface ICurrentStatusProps {
    account: zfaceHelper.AccountInfo;
}

export default class CurrentStatus extends React.Component<ICurrentStatusProps, ICurrentStatusStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            balance: 0,
        };
    }

    public componentDidMount(): void {
        this.getBalance();
    }

    public render() {
        return (
            <div className="card">
                <div className="card-body">
                    <span className="small">From Address:</span>
                    <p>{this.props.account.address}</p>
                    <span className="small">From Address Balance:</span>
                    <p className="font-weight-bold">{this.state.balance} ZLX</p>
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
}
