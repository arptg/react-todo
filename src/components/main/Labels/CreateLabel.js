import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Input } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

import actions from 'redux/Todos/actions';

export default function CreateLabel() {
  const [modal, setModal] = useState(false);

  const ref = useRef();

  const dispatch = useDispatch();

  function openLabelCreateModal() {
    setModal(true);
  }

  function closeLabelCreateModal() {
    setModal(false);
  }

  function createLabel() {
    const name = ref.current.state.value;
    dispatch({ type: actions.CREATE_LABEL, payload: { name } });
    closeLabelCreateModal();
  }

  return (
    <>
      <Button onClick={openLabelCreateModal}>
        <PlusCircleTwoTone />
      </Button>
      <Modal
        visible={modal}
        onCancel={closeLabelCreateModal}
        onOk={createLabel}
        title="Add Bucket"
        okText="Create"
      >
        <Input ref={ref} placeholder="Label Name" />
      </Modal>
    </>
  );
}
