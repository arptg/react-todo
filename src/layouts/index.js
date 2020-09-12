import React, { Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppLayout from './App';
import AuthLayout from './Auth';

const Layouts = {
  app: AppLayout,
  auth: AuthLayout,
};

const mapStateToProps = ({ User }) => ({ user: User });

@withRouter
@connect(mapStateToProps)
class Layout extends React.PureComponent {
  render() {
    const {
      children,
      location: { pathname },
      user,
    } = this.props;

    const getLayout = () => {
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'auth';
      }
      return 'app';
    };

    const Container = Layouts[getLayout()];
    const isUserAuthorized = user.authorized;
    const isUserLoading = user.loading;
    const isAuthLayout = getLayout() === 'auth';

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
        return <div className="shop__initial__loading" />;
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isAuthLayout && !isUserAuthorized) {
        return <Redirect to="/user/login" />;
      }
      // in other case render previously set layout
      return <Container>{children}</Container>;
    };

    return (
      <Fragment>
        <Helmet titleTemplate="Todos | %s" title="Home" />
        {BootstrappedLayout()}
      </Fragment>
    );
  }
}

export default Layout;
