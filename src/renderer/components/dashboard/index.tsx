import React from 'react';
import * as zfaceHelper from '../../zface_helper';
import AccountSelect from './../accounts/account_select';
import Accounts from './accounts';
import SummaryCard from './summary_card';

interface IDashboardState {
    accounts: zfaceHelper.AccountInfo[];
    defaultAccount: zfaceHelper.AccountInfo;
}

export default class Dashboard extends React.Component<{}, IDashboardState> {
    constructor(props: any) {
        super(props);
        const accounts = this.getAccountList();
        this.state = {
            accounts,
            defaultAccount: accounts[0],
        };
    }
    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Dashboard</h1>
                        <div className="account-select-box">
                            <AccountSelect
                                onSelect={this.changeAccount.bind(this)}
                                accounts={this.state.accounts}
                                defaultAccountName={this.state.defaultAccount.name}
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <SummaryCard account={this.state.defaultAccount} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Your Accounts</h2>
                        <Accounts accounts={this.state.accounts} />
                    </div>
                </div>
            </div>
        );
    }

    private async changeAccount(event: React.FormEvent<HTMLSelectElement>) {
        const accountName = event.currentTarget.value;
        zfaceHelper.changeDefaultAccount(accountName);
        await this.setAccounts();
        this.setDefaultAccount();
    }

    private setAccounts(): void {
        this.setState({
            accounts: this.getAccountList(),
        });
    }

    private setDefaultAccount(): void {
        const defaultAccount = this.state.accounts.find(({isDefault}) => (isDefault));
        if (defaultAccount !== undefined) {
            this.setState({ defaultAccount });
        }
    }

    private getAccountList(): zfaceHelper.AccountInfo[] {
        try {
            const accountList = zfaceHelper.getAccountList();
            return accountList;
        } catch (error) {
            alert(error.message);
            return [];
        }
    }
}
