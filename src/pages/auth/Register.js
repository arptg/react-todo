import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import RegisterForm from 'components/auth/RegisterForm';

import './register.css';

export default function Login() {
  return (
    <div className="register-wrapper">
      <Card
        bodyStyle={{
          textAlign: 'center',
        }}
      >
        <RegisterForm />
        <Typography.Text>
          Already a member ? Click <Link to="/user/login">here</Link> to login.
        </Typography.Text>
      </Card>
    </div>
  );
}
