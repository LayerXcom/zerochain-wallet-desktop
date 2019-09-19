import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';

import Dashboard from './components/dashboard';
import Recieve from './components/recieve';
import Send from './components/send';
import Settings from './components/settings';

import './../css/index.scss';

const routes = [
    {
        component: Dashboard,
        exact: true,
        path: '/',
    },
    {
        component: Send,
        path: '/Send',
    },
    {
        component: Recieve,
        path: '/Recieve',
    },
    {
        component: Settings,
        path: '/settings',
    },
  ];

class ZerochainWalletApp extends React.Component {
    public render() {
        return (
            <Router>
            <div style={{ display: 'flex' }}>
                <div style={{padding: '10px', width: '30%', background: '#f0f0f0'}}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/send">Send</Link></li>
                        <li><Link to="/recieve">Recieve</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </div>

                <div style={{ flex: 1, padding: '10px' }}>
                {routes.map((route, index) => (
                    <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    />
                ))}
                </div>
            </div>
        </Router>
        );
    }
}
const container = document.getElementById('contents');

ReactDom.render(
    new ZerochainWalletApp({}).render(),
    container,
);
