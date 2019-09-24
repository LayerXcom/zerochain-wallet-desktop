import {
    History,
} from 'history';
import React from 'react';

interface ICreateWallet {
    history: History;
}

export default class Recovery extends React.Component<ICreateWallet> {
    public render() {
        return (
            <div>
                <h1>Recovery</h1>
                <button className="btn btn-link">input mnemonic</button>
                <button
                    onClick={() => this.props.history.goBack()}
                    className="btn btn-link">
                        back to menu
                </button>
            </div>
        );
    }
}
