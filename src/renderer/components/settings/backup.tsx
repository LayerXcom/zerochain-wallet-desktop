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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Backup</h1>
            <button className="btn btn-link">show mnemonic</button>
            <button onClick={() => this.props.history.goBack()} className="btn btn-link">back to menu</button>
          </div>
        </div>
      </div>
    );
  }
}
