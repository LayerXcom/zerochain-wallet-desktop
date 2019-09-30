import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import * as zfaceHelper from '../../zface_helper';

interface IDashboardState {
    accounts: zfaceHelper.AccountInfo[];
}

export default class AddressTable extends React.Component<{}, IDashboardState> {
    public constructor(props: any) {
        super(props);
        this.state = {
          accounts: [],
        };
        this.getAccountList = this.getAccountList.bind(this);
    }
    public render() {
        return (
            <div>
                <h2>Your Adresses</h2>
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

    public componentDidMount(): void {
        this.getAccountList();
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

}
