import React, { memo } from 'react'
import { Table } from 'react-bootstrap'

function AllEmployeesTable({ employees }) {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
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
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default memo(AllEmployeesTable)