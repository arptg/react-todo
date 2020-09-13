import React, { useState } from 'react';
import { Empty, Button, Space, Card, Typography, Tag, Checkbox } from 'antd';
import { EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons';
import './styles.css';

const todos = [
  {
    id: 1,
    title: 'Some Title',
    description: 'Lorem Ipsum',
    done: false,
    label: 'Some Label',
  },
  {
    id: 2,
    title: 'Some Title',
    description: 'Lorem Ipsum',
    done: false,
    label: 'Some Label',
  },
  {
    id: 3,
    title: 'Some Title',
    description: 'Lorem Ipsum',
    done: true,
    label: 'Some Label',
  },
  {
    id: 4,
    title: 'Some Title',
    description: 'Lorem Ipsum',
    done: false,
    label: 'Some Label',
  },
];

export default function Todos() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTodo, setShowTodo] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  function renderTodoItems() {
    if (!todos || !todos.length) {
      return (
        <>
          <Empty description="No todos created">
            <Space direction="vertical">
              <Button type="primary"> Create Todo</Button>
            </Space>
          </Empty>
        </>
      );
    }

    return (
      <Space direction="vertical" className="todo-item-wrapper">
        {todos.map((todo) => (
          <Card
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
                <Checkbox checked={todo.done} />
                <Typography.Title
                  className="todo-title"
                  level={5}
                  delete={todo.done}
                >
                  {todo.title}
                </Typography.Title>
                <Tag>{todo.label}</Tag>
              </Space>
            </div>
            <div className="todo-actions">
              <Space>
                <Button>
                  <EyeFilled />
                </Button>
                <Button>
                  <EditFilled />
                </Button>
                <Button>
                  <DeleteFilled />
                </Button>
              </Space>
            </div>
          </Card>
        ))}
      </Space>
    );
  }

  return <div>{renderTodoItems()}</div>;
}
