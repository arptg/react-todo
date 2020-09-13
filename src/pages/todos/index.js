import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { Todos } from 'components/main';

import actions from 'redux/Todos/actions';

import './styles.css';

export default function Main() {
  const todos = useSelector((state) => state.Todos.todos);
  const dispatch = useDispatch();

  function deleteTodo(id) {
    dispatch({ type: actions.DELETE_TODO, payload: { id } });
  }

  return (
    <div className="homepage-wrapper">
      <div className="title-wrapper">
        <Typography.Title>Todos</Typography.Title>
        <hr className="title-hr" />
        <div className="todos-wrapper">
          <Todos todos={todos} deleteTodo={deleteTodo} />
        </div>
      </div>
    </div>
  );
}
