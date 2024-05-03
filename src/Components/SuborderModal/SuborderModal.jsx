import Modal from 'react-bootstrap/Modal';
import Tree from 'react-d3-tree';

function SuborderModal({ show, setShow }) {
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suborders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Sub order</h1>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SuborderModal;