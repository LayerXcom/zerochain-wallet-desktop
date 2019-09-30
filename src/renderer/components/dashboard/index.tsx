import React from 'react';
import Accounts from './accounts';
import SummaryCard from './summary_card';

interface IDashboardState {
    balance: number;
}

export default class Dashboard extends React.Component<{}, IDashboardState> {
    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                    <h1>Dashboard</h1>
                        <SummaryCard />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Your Accounts</h2>
                        <Accounts />
                    </div>
                </div>
            </div>
        );
    }
}
