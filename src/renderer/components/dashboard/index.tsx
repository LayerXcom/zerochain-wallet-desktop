import React from 'react';
import AddressTable from './address_table';
import SummaryCard from './summary_card';

interface IDashboardState {
    balance: number;
}

export default class Dashboard extends React.Component<{}, IDashboardState> {
    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                    <h1>Dashboard</h1>
                        <SummaryCard />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <AddressTable />
                    </div>
                </div>
            </div>
        );
    }
}
