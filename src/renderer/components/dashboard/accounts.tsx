import React from 'react';
import * as zfaceHelper from '../../zface_helper';
import AccountTable from './../accounts/account_table';

interface IAddressStableProps {
    accounts: zfaceHelper.AccountInfo[];
}

export default class Accounts extends React.Component<IAddressStableProps> {
    public render() {
        return (
            <div>
                <AccountTable accounts={this.props.accounts} />
            </div>
        );
    }
}
