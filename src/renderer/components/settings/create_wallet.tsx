import {
  History,
} from 'history';
import React from 'react';
import get_cpu_num from '../../zface_helper';

interface ICreateWallet {
  history: History;
}

export default class CreateWallet extends React.Component<ICreateWallet> {
  public render() {
    console.log(get_cpu_num());
    return (
      <div>
        <h2>Create Wallet</h2>
        <button>create</button>
        <button onClick={() => this.props.history.goBack()}>back to menu</button>
      </div>
    );
  }
}
