import Modal from 'react-bootstrap/Modal';
import Tree from 'react-d3-tree';
import "./SuborderModal.css"

function SuborderModal({ show, setShow, selectedEmployee }) {
    const handleClose = () => setShow(false);

    console.log(selectedEmployee);

    const orgChart = {
        name: 'CEO',
        children: [
            {
                name: 'Manager',
                attributes: {
                    department: 'Production',
                },
                children: [
                    {
                        name: 'Foreman',
                        attributes: {
                            department: 'Fabrication',
                        },
                        children: [
                            {
                                name: 'Worker',
                            },
                        ],
                    },
                    {
                        name: 'Foreman',
                        attributes: {
                            department: 'Assembly',
                        },
                        children: [
                            {
                                name: 'Worker',
                            },
                        ],
                    },
                ],
            },
        ],
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Suborders</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "79vh" }}>
                    <h1>Sub order</h1>
                    <Tree data={orgChart} orientation='vertical' />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SuborderModal;