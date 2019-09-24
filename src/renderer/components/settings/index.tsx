import React from 'react';
import {
    match,
    Route,
} from 'react-router-dom';
import Backup from './backup';
import CreateWallet from './create_wallet';
import Recovery from './recovery';
import SettingsMenu from './menu';

interface ISettingsProps {
    match: match;
}

export default class Settings extends React.Component<ISettingsProps> {
    public render() {
        const params = this.props.match;
        return (
            <div>
                <Route exact path={`${params.path}/`} component={SettingsMenu} />
                <Route path={`${params.path}/backup`} component={Backup} />
                <Route path={`${params.path}/recovery`} component={Recovery} />
                <Route path={`${params.path}/create-wallet`} component={CreateWallet} />
            </div>
        );
    }
}
