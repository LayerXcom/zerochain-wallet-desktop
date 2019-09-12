import {
  History,
} from 'history';
import React from 'react';

interface IBackup {
  history: History;
}

export default class Backup extends React.Component<IBackup> {
  public render() {
    return (
      <div>
        <h2>Backup</h2>
        <button>show mnemonic</button>
        <button onClick={() => this.props.history.goBack()}>back to menu</button>
      </div>
    );
  }
}
