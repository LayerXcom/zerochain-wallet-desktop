import React from 'react';
import {
  Link,
  match,
} from 'react-router-dom';

interface ISettingsProps {
  match: match;
}

export default class SettingsMenu extends React.Component<ISettingsProps> {
  public render() {
    const params = this.props.match;
    return (
      <div>
        <h2>Settings</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link to={`${params.url}/backup`}>Backup</Link>
          </li>
          <li className="list-group-item">
            <Link to={`${params.url}/recovery`}>Recovery</Link>
          </li>
          <li className="list-group-item">
            <Link to={`${params.url}/create-wallet`}>Create Wallet</Link>
          </li>
        </ul>
      </div>
    );
  }
}
