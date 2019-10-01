import React from 'react';
import * as zfaceHelper from '../../zface_helper';
import AccountSelect from './../accounts/account_select';
import CurrentStatus from './current_status';
import SendForm from './form';

interface ISendStates {
    accounts: zfaceHelper.AccountInfo[];
    defaultAccount: zfaceHelper.AccountInfo;
}

export default class Send extends React.Component<{}, ISendStates> {
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
                <h1>Send</h1>
                <div className="row">
                    <div className="col-sm-7">
                        <AccountSelect
                            accounts={this.state.accounts}
                            defaultAccountName={this.state.defaultAccount.name}
                            onSelect={this.changeAccount.bind(this)}
                        />
                        <SendForm />
                    </div>
                    <div className="col-sm-5">
                        <CurrentStatus account={this.state.defaultAccount}/>
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount(): void {
        this.setAccounts();
    }

    public async changeAccount(event: React.FormEvent<HTMLSelectElement>) {
        const accountName = event.currentTarget.value;
        zfaceHelper.changeDefaultAccount(accountName);
        await this.setAccounts();
        this.setDefaultAccount();
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

    private setAccounts(): void {
        this.setState({
            accounts: this.getAccountList(),
        });
    }

    private setDefaultAccount(): void {
        this.setState({
            defaultAccount: this.state.accounts[0],
        });
    }
}
