import React from 'react';
import './styles.css';

import background from 'assets/images/loginBackground.jpg';

export default function Auth({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-background">
        <img src={background} alt="login_background" />
      </div>
      <div className="auth-content">{children}</div>
    </div>
  );
}
