import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import Layout from 'layouts';
import NotFoundPage from 'pages/404';

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <div className="initial__loading" />,
  });

const routes = [
  // Auth Routes
  {
    path: '/user/register',
    Component: loadable(() => import('pages/auth/Register')),
    exact: true,
  },
  {
    path: '/user/login',
    Component: loadable(() => import('pages/auth/Login')),
    exact: true,
  },
  // App Routes
  {
    path: '/',
    Component: loadable(() => import('pages/main')),
    exact: true,
  },
  {
    path: '/404',
    Component: loadable(() => import('pages/404')),
    exact: true,
  },
];

@connect()
class Router extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          {routes.map(({ path, Component, exact }) => (
            <Route path={path} key={path} exact={exact} component={Component} />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default Router;
