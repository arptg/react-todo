import React from 'react';
import { Typography, Form, Input, Select, Button } from 'antd';

import './styles.css';

export default function Create() {
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 22, span: 2 },
  };

  function handleCreateFormSubmit(values) {
    console.log(values);
  }

  return (
    <div className="homepage-wrapper">
      <div className="title-wrapper">
        <Typography.Title>Create Todo</Typography.Title>
        <hr className="title-hr" />
        <div className="todos-wrapper">
          <Form
            {...layout}
            requiredMark={false}
            name="TodoAction"
            initialValues={{}}
            onFinish={handleCreateFormSubmit}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bucket"
              name="label"
              rules={[{ required: true, message: 'Please select a bucket' }]}
            >
              <Select>
                <Select.Option value="none">Label</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
