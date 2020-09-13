import React from 'react';
import { Typography } from 'antd';
import { Todos } from 'components/main';

import './styles.css';

export default function Main() {
  return (
    <div className="homepage-wrapper">
      <div className="title-wrapper">
        <Typography.Title>Todos</Typography.Title>
        <hr className="title-hr" />
        <div className="todos-wrapper">
          <Todos />
        </div>
      </div>
    </div>
  );
}
