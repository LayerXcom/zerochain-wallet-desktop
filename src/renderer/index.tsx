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

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
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
                    <div className="border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading">Zerochain Wallet</div>
                        <div className="list-group list-group-flush">
                            <Link to="/" className="list-group-item list-group-item-action">
                                <i className="fas fa-table"></i>Dashboard
                            </Link>
                            <Link to="/send" className="list-group-item list-group-item-action">
                            <i className="fas fa-paper-plane"></i>Send
                            </Link>
                            <Link to="/recieve" className="list-group-item list-group-item-action">
                                <i className="fas fa-wallet"></i>Recieve
                            </Link>
                            <Link to="/settings" className="list-group-item list-group-item-action">
                                <i className="fas fa-cog"></i>Settings
                            </Link>
                        </div>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
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
                                </div>
                            </div>
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
