import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface IAddressTableProps {
    accounts: zfaceHelper.AccountInfo[];
    defaultAccountName: string;
    onSelect: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export default class AccountSelect extends React.Component<IAddressTableProps, {}> {
    public render() {
        return (
            <form className="form-inline">
                <label style={{marginRight: '1.0rem'}}>Current Account: </label>
                <select
                    className="form-control"
                    onChange={this.props.onSelect}
                    value={this.props.defaultAccountName}
                >
                    {this.props.accounts.map((account) =>
                        <option
                            key={account.name} value={account.name}>
                            {account.name}
                        </option>,
                    )}
                </select>
            </form>
        );
    }
}
