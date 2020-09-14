import React from 'react';
import { Typography, Form, Input, Select, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CreateLabelButton from 'components/main/Labels/CreateLabel';

import actions from 'redux/Todos/actions';

import './styles.css';

export default function Create() {
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 22, span: 2 },
  };

  const dispatch = useDispatch();
  const labels = useSelector((state) => state.Todos.labels);

  function handleCreateFormSubmit(values) {
    dispatch({ type: actions.CREATE_TODO, payload: values });
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
              <Row gutter={[24]}>
                <Col span={22}>
                  <Select>
                    {labels &&
                      labels.map((label) => (
                        <Select.Option key={label.id} value={label.id}>
                          {label.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
                <Col span={2}>
                  <CreateLabelButton />
                </Col>
              </Row>
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
