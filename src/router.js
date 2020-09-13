import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
    path: '/todos',
    Component: loadable(() => import('pages/todos')),
    exact: true,
  },
  {
    path: '/todos/create',
    Component: loadable(() => import('pages/todos/create')),
    exact: true,
  },
  {
    path: '/todos/:id',
    Component: loadable(() => import('pages/todos/edit')),
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
          <Route exact path="/" render={() => <Redirect to="/todos" />} />
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
