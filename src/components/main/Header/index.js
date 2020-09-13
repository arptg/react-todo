import React from 'react';
import LogoutButton from 'components/auth/LogoutButton';

import './style.css';

export default function Header() {
  return (
    <div className="header-inner">
      <div className="logo">Logo</div>
      <div className="user-actions">
        <div className="logout">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
