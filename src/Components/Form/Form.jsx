import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { getAllEmployees } from '../../Services/Employee.sevices';
import { useForm } from 'react-hook-form';

export default function FormComponent({ handleClose, setShow }) {
    const [employees, setEmployees] = useState(null);
    const [loader, setLoader] = useState(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setLoader(true)
        const unsubscribe = getAllEmployees((employeesList) => {
            setEmployees(employeesList);
            setLoader(false)
        });

        return () => unsubscribe();
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        setShow(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" {...register("name", { required: true })} />
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
                            loader ? <option>Loading...</option> : (
                                employees.map((employee, index) => {
                                    return (
                                        <option key={index} value={employee.id}>{employee.name} / {employee.position}</option>
                                    )
                                }))
                        }
                    </Form.Select>
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Add Employee
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    )
}
