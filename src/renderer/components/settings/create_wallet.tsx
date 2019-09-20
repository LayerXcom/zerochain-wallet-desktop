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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Create Wallet</h1>
            <p>new_address: {this.state.new_address}</p>
            <button onClick={this.new_wallet} className="btn btn-link">create</button>
            <button onClick={() => this.props.history.goBack()} className="btn btn-link">back to menu</button>
          </div>
        </div>
      </div>
    );
  }

  private new_wallet(): void {
    try {
      const newAddress = zfaceHelper.new_wallet();
      this.setState({ new_address: newAddress });
    } catch (error) {
      alert(error.message);
    }
  }
}
