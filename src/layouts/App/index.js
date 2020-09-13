import React from 'react';
import { Layout } from 'antd';
import { Header } from 'components/main';

import './styles.css';

const { Header: LayoutHeader, Footer: LayoutFooter, Content } = Layout;

export default function App({ children }) {
  return (
    <Layout>
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <Content
        style={{ minHeight: 'calc(100vh - 120px)', backgroundColor: '#F0F2F5' }}
      >
        <div className="main-content">{children}</div>
      </Content>
      <LayoutFooter></LayoutFooter>
    </Layout>
  );
}
