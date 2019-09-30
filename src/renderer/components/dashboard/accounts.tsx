import React from 'react';
import * as zfaceHelper from '../../zface_helper';
import AccountSelect from './../accounts/account_select';
import AccountTable from './../accounts/account_table';

interface IAddressStableStates {
    accounts: zfaceHelper.AccountInfo[];
    defaultAccountName: string;
}

export default class Accounts extends React.Component<{}, IAddressStableStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
          accounts: [],
          defaultAccountName: '',
        };
        this.getAccountList = this.getAccountList.bind(this);
    }
    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <AccountSelect
                            onSelect={this.changeAccount.bind(this)}
                            accounts={this.state.accounts}
                            defaultAccountName={this.state.defaultAccountName}
                        />
                    </div>
                </div>
                <AccountTable accounts={this.state.accounts} />
            </div>
        );
    }

    public async componentDidMount() {
        await this.getAccountList();
        this.setDefaultAccountName(this.getDefaultAccountName());
    }

    public getAccountList(): void {
        try {
            const accountList = zfaceHelper.getAccountList();
            this.setState({
                accounts: accountList,
            });
        } catch (error) {
            alert(error.message);
        }
    }

    public changeAccount(event: React.FormEvent<HTMLSelectElement>): void {
        const accountName = event.currentTarget.value;
        zfaceHelper.changeDefaultAccount(accountName);
        this.setDefaultAccountName(accountName);
        this.getAccountList();
    }

    private getDefaultAccountName(): string {
        let accountName = '';
        this.state.accounts.forEach((account) => {
            accountName = account.isDefault ? account.name : accountName;
        });
        return accountName
    }

    private setDefaultAccountName(defaultAccountName: string): void {
        this.setState({defaultAccountName});
    }

}
