import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import actions from 'redux/User/actions';

export default function LogoutButton() {
  const dispatch = useDispatch();

  function logout() {
    dispatch({ type: actions.LOGOUT });
  }

  return (
    <Button onClick={logout} type="text">
      Logout
    </Button>
  );
}
