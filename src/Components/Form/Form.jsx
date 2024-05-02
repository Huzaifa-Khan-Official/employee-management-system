import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getAllSupervisors } from '../../Services/Employee.sevices';

export default function FormComponent() {
    const [supervisors, setSupervisors] = useState(null);

    useEffect(() => {
        const unsubscribe = getAllSupervisors((supervisorsList) => {
            setSupervisors(supervisorsList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="Enter position" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter your reporting supervisor</Form.Label>
                <Form.Select aria-label="Default select example" defaultValue="default">
                    <option disabled value="default">Select your reporting supervisor</option>
                    {
                        supervisors &&
                        supervisors.map((supervisor, index) => {
                            return (
                                <option key={index} value={supervisor.name}>{supervisor.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>
        </div>
    )
}
