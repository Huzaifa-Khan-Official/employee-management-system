import Modal from 'react-bootstrap/Modal';
import Tree from 'react-d3-tree';
import "./SuborderModal.css"
import { useLayoutEffect, useState } from 'react';
import { getEmployeeData } from '../../Services/Employee.sevices'

function SuborderModal({ show, setShow, selectedEmployee }) {
    const handleClose = () => setShow(false);
    const [employeeData, setEmployeeData] = useState(null);

    useLayoutEffect(() => {
        (async () => {
            const data = await getEmployeeData(selectedEmployee);
            setEmployeeData(data);
        })()

    }, []);

    const orgChart = {
        name: employeeData?.supervisorData?.name,
        attributes: {
            Position: employeeData?.supervisorData?.position
        },
        children: [
            {
                name: employeeData?.name,
                attributes: {
                    Position: employeeData?.position,
                },
                children:
                    employeeData?.subordinates?.map((employee) => {
                        return { name: employee }
                    })
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
                    {
                        employeeData ? <Tree data={orgChart} orientation='vertical' /> : <h2>Loading...</h2>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SuborderModal;