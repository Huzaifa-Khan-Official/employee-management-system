import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormComponent from '../Form/Form';

function ModalComponent({ show, setShow }) {

    const handleClose = () => setShow(false);

    console.log("me chala");
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormComponent />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add Employee
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComponent;