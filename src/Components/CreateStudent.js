import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { port } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  let navigate = useNavigate();
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let handleSubmit = () => {
    try {
      axios.post(`${port}/students/createStudent`, {
        studentName: name,
        email: email
      });
      navigate('/student-dashboard');
    }
    catch (err) {
      console.error("Error assigning student:", err);
    }
  }

  return <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
          <h1 className="h3 mb-0 text-gray-800">Create Student</h1>
        </div>
      </div>
      <div className="container-fluid">
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Student Name" onChange={(e) => { setName(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter Email Address" onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => { handleSubmit() }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </div>
}

export default CreateStudent