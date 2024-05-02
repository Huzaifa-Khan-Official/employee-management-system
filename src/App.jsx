import './App.css'
import { Button } from 'react-bootstrap';
import ModalComponent from './Components/Modal/Modal';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>
      {
        show && <ModalComponent show={show} setShow={setShow} />
      }
    </>
  )
}

export default App
