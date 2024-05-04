import React, { memo, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import SuborderModal from '../SuborderModal/SuborderModal';

function AllEmployeesTable({ employees }) {
    const [show, setShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const viewSubordinates = (id) => {
        setSelectedEmployee(id)
        setShow(true)
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <Button variant="primary"
                                            onClick={() => viewSubordinates(employee.id)}
                                        >
                                            View Subordinates
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                show && <SuborderModal show={show} setShow={setShow} selectedEmployee={selectedEmployee} />
            }
        </div>
    )
}

export default memo(AllEmployeesTable)