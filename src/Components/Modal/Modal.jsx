import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormComponent from '../Form/Form';

function ModalComponent({ show, setShow }) {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormComponent handleClose={handleClose} setShow={setShow}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalComponent;