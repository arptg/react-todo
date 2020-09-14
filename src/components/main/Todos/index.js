import React, { useState } from 'react';
import {
  Empty,
  Button,
  Space,
  Card,
  Typography,
  Tag,
  Checkbox,
  Modal,
} from 'antd';
import { EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import { history } from 'index';

import './styles.css';

export default function Todos({ todos, ...props }) {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTodo, setShowTodo] = useState(false);

  function handleViewTodo(id) {
    let [todo] = todos.filter((td) => td.id === id);
    setSelectedTodo(todo);
    setShowTodo(true);
  }

  function handleHideTodo() {
    setSelectedTodo(null);
    setShowTodo(false);
  }

  function handleEditTodo(id) {
    history.push(`/todos/${id}`);
  }

  function handleCreateTodo() {
    history.push(`/todos/create`);
  }

  function handleDeleteTodo(id) {
    if (typeof props.deleteTodo === 'function') {
      props.deleteTodo(id);
    }
  }

  function handleMarkTodo(id, value) {
    if (typeof props.markTodo === 'function') {
      let [todo] = todos.filter((td) => td.id === id);
      todo.done = value;
      props.markTodo(todo);
    }
  }

  function renderTodoItems() {
    if (!todos || !todos.length) {
      return (
        <>
          <Empty description="No todos created">
            <Space direction="vertical">
              <Button type="primary" onClick={handleCreateTodo}>
                Create Todo
              </Button>
            </Space>
          </Empty>
        </>
      );
    }

    return (
      <Space direction="vertical" className="todo-item-wrapper">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            class="todo-item"
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 24px',
            }}
          >
            <div className="todo-title-label">
              <Space>
                <Checkbox
                  checked={todo.done}
                  onChange={(e) => {
                    handleMarkTodo(todo.id, e.target.checked);
                  }}
                />
                <Typography.Title
                  className="todo-title"
                  level={5}
                  delete={todo.done}
                >
                  {todo.title}
                </Typography.Title>
                <Tag>{todo.label_name}</Tag>
              </Space>
            </div>
            <div className="todo-actions">
              <Space>
                <Button onClick={() => handleViewTodo(todo.id)}>
                  <EyeFilled />
                </Button>
                <Button onClick={() => handleEditTodo(todo.id)}>
                  <EditFilled />
                </Button>
                <Button onClick={() => handleDeleteTodo(todo.id)}>
                  <DeleteFilled />
                </Button>
              </Space>
            </div>
          </Card>
        ))}
        <div className="create-button">
          <Button type="primary" onClick={handleCreateTodo}>
            Create Todo
          </Button>
        </div>
      </Space>
    );
  }

  return (
    <div>
      {renderTodoItems()}
      <Modal
        className="view-todo-modal"
        title={selectedTodo?.title}
        visible={showTodo}
        onOk={handleHideTodo}
        onCancel={handleHideTodo}
      >
        <Space direction="vertical">
          <div>
            <b>Bucket : </b> {selectedTodo?.label_name}
          </div>
          <div>
            <b>Status : </b> {selectedTodo?.done ? 'Done' : 'Not Done'}
          </div>
          <div>
            <b>Description : </b> {selectedTodo?.description}
          </div>
        </Space>
      </Modal>
    </div>
  );
}
