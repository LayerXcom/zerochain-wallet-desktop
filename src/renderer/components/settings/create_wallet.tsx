import {
  History,
} from 'history';
import React from 'react';
import * as zfaceHelper from '../../zface_helper';

interface ICreateWalletProps {
  history: History;
}

interface ICreateWalletStates {
  new_address: string;
}

export default class CreateWallet extends React.Component<ICreateWalletProps, ICreateWalletStates> {
  public constructor(props: any) {
    super(props);
    this.state = {
      new_address: '',
    };
    this.new_wallet = this.new_wallet.bind(this);
  }

  public render() {
    return (
      <div>
        <h2>Create Wallet</h2>
        <button onClick={this.new_wallet}>create</button>
        <button onClick={() => this.props.history.goBack()}>back to menu</button>
        <p>new_address: {this.state.new_address}</p>
      </div>
    );
  }

  private new_wallet(): void {
    try {
      const new_address = zfaceHelper.new_wallet();
      this.setState({new_address});
    } catch(error) {
      alert(error.message);
    }
  }
}
