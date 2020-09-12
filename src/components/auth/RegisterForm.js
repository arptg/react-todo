import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import actions from 'redux/User/actions';

const layout = {
  labelCol: { span: 24, offset: 4 },
  wrapperCol: { span: 16, offset: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};

export default function LoginForm() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch({ type: actions.REGISTER, payload: values });
  };

  return (
    <Form
      {...layout}
      name="basic"
      requiredMark={false}
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
