import {
    History,
} from 'history';
import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface ICreateWalletProps {
  history: History;
}

interface ICreateWalletStates {
  newAddress: string;
}

export default class CreateWallet extends React.Component<ICreateWalletProps, ICreateWalletStates> {
    public constructor(props: any) {
        super(props);
        this.state = {
            newAddress: '',
        };
        this.newWallet = this.newWallet.bind(this);
    }

    public render() {
        return (
            <div>
                <h1>Create Wallet</h1>
                <p>new address: {this.state.newAddress}</p>
                <button onClick={this.newWallet} className="btn btn-link">create</button>
                <button
                    onClick={() => this.props.history.goBack()} className="btn btn-link">
                        back to menu
                </button>
            </div>
        );
    }

    private newWallet(): void {
        try {
              const newAddress = zfaceHelper.newWallet();
              this.setState({ newAddress });
        } catch (error) {
              alert(error.message);
        }
    }
}
