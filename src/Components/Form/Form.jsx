import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addEmployee, getAllEmployees } from '../../Services/Employee.sevices';
import { useForm } from 'react-hook-form';
import "./Form.css"
import LoaderContext from '../../Context/Loader.context';

export default function FormComponent({ handleClose, setShow }) {
    const [employees, setEmployees] = useState(null);
    const [loader2, setLoader2] = useState(true);
    const { loader, setLoader } = useContext(LoaderContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    useEffect(() => {
        setLoader2(true)
        const unsubscribe = getAllEmployees((employeesList) => {
            setEmployees(employeesList);
            setLoader2(false)
        });

        return () => unsubscribe();
    }, []);

    const onSubmit = async (data) => {
        setShow(false);
        setLoader(true);
        await addEmployee(data);
        setLoader(false);
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" {...register("name", {
                        required: {
                            value: true,
                            message: "Please enter your name"
                        }
                    })} />
                    <p className="error">
                        {
                            (errors && errors.name) && `${errors.name.message}`
                        }
                    </p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email", {
                        required: {
                            value: true,
                            message: "Please enter your email"
                        }
                    })} />
                    <p className="error">
                        {
                            (errors && errors.email) && `${errors.email.message}`
                        }
                    </p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text" placeholder="Enter position" {...register("position", {
                        required: {
                            value: true,
                            message: "Please enter your position"
                        }
                    })} />
                    <p className="error">
                        {
                            (errors && errors.position) && `${errors.position.message}`
                        }
                    </p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter your reporting supervisor</Form.Label>
                    <Form.Select aria-label="Default select example" defaultValue="default" {...register("supervisorId", {
                        required: {
                            value: true,
                            message: "Please select your reporting supervisor"
                        }
                    })}>
                        <option disabled value="default">Select your reporting supervisor</option>
                        {
                            loader2 ? <option>Loading...</option> : (
                                employees.map((employee, index) => {
                                    return (
                                        <option key={index} value={employee.id}>{employee.name} / {employee.position}</option>
                                    )
                                }))
                        }
                    </Form.Select>
                    <p className="error">
                        {
                            (errors && errors.supervisorId) && `${errors.supervisorId.message}`
                        }
                    </p>
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
