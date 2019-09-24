import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface ICurrentStatusStates {
    balance: any;
}

export default class CurrentStatus extends React.Component<{}, ICurrentStatusStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            balance: null,
        };
    }

    public componentDidMount(): void {
        this.get_balance();
    }

    public render() {
        return (
            <div className="card">
                <div className="card-body">
                    <span className="small">Current Balance:</span>
                    <p className="font-weight-bold">{this.state.balance} ZLX</p>
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
}
