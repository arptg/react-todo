import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import LoginForm from 'components/auth/LoginForm';

import './login.css';

export default function Login() {
  return (
    <div className="login-wrapper">
      <Card
        bodyStyle={{
          textAlign: 'center',
        }}
      >
        <LoginForm />
        <Typography.Text>
          Not registered yet ? Click <Link to="/user/register">here</Link> to
          register!
        </Typography.Text>
      </Card>
    </div>
  );
}
