import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import * as zfaceHelper from '../../zface_helper';
import AccountSelect from './account_select';

interface IAddressStableStates {
    accounts: zfaceHelper.AccountInfo[];
    defaultAccountName: string;
}

export default class AddressTable extends React.Component<{}, IAddressStableStates> {
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
                <h2>Your Accounts</h2>
                <div className="row">
                    <div className="col-sm-6">
                        <AccountSelect
                            onSelect={this.changeAccount.bind(this)}
                            accounts={this.state.accounts}
                            defaultAccountName={this.state.defaultAccountName}
                        />
                    </div>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                        {this.state.accounts.map((account) =>
                            <tr key={account.name}>
                                <td>
                                    { account.isDefault && <div className="font-weight-bold">*{account.name}</div> }
                                    { !account.isDefault && <div>{account.name}</div> }
                                </td>
                                <td>{account.address}</td>
                                <td>
                                    <CopyToClipboard text={account.address}>
                                        <a data-tip="click to copy">
                                            <i className="fas fa-copy fa-lg copy-icon"></i>
                                        </a>
                                    </CopyToClipboard>
                                    <ReactTooltip />
                                </td>
                            </tr>,
                        )}
                    </tbody>
                </table>
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
