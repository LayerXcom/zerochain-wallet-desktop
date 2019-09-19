import React from 'react';
import ReactDom from 'react-dom';
import {
  HashRouter as Router,
  Link,
  Route,
  Switch,
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
                <div className="d-flex" id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading">Zerochain Wallet</div>
                        <div className="list-group list-group-flush">
                            <Link to="/" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                            <Link to="/send" className="list-group-item list-group-item-action bg-light">Send</Link>
                            <Link to="/recieve" className="list-group-item list-group-item-action bg-light">Recieve</Link>
                            <Link to="/settings" className="list-group-item list-group-item-action bg-light">Settings</Link>
                        </div>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                    />
                                ))}
                                <Route component={Dashboard} />
                            </Switch>
                        </div>
                        {/* .container-fluid */}
                    </div>
                    {/* #page-content-wrapper */}
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
