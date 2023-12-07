// Вікно для введення електронної пошти під час реєстрації на подію
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, handleEmailSubmit, emailInput, setEmailInput }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Введіть свій email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Введіть ваш email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрити
        </Button>
        <Button variant="primary" onClick={() => handleEmailSubmit(emailInput)}>
          Відправити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
