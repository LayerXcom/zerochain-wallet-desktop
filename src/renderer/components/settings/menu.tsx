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
        <ul>
          <li>
            <Link to={`${params.url}/backup`}>Backup</Link>
          </li>
          <li>
            <Link to={`${params.url}/recovery`}>Recovery</Link>
          </li>
          <li>
            <Link to={`${params.url}/create-wallet`}>Create Wallet</Link>
          </li>
        </ul>
      </div>
    );
  }
}
