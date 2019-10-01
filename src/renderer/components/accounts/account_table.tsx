import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import * as zfaceHelper from '../../zface_helper';

interface IAccountTableProps {
    accounts: zfaceHelper.AccountInfo[];
}

export default class AccountTable extends React.Component<IAccountTableProps> {
    public render() {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                    {this.props.accounts.map((account) =>
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
        );
    }
}
