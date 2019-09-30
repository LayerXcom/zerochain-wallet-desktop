import React from 'react';
import * as zfaceHelper from '../../zface_helper';
import AccountTable from './../accounts/account_table';

import NewAccount from './new_account';

interface IRecieve {
    accounts: zfaceHelper.AccountInfo[];
}

export default class Recieve extends React.Component<{}, IRecieve> {
    public constructor(props: any) {
        super(props);
        this.state = {
          accounts: [],
        };
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

    public render() {
        return (
            <div>
                <h1>Recieve</h1>
                <AccountTable accounts={this.state.accounts} />
                <NewAccount onCreate={this.getAccountList.bind(this)} />
            </div>
        );
    }
}
