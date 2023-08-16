import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { port } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${port}/signupLogin/signUp`, {
        userName: name,
        email: email,
        password: password
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/logIn');
      } else {
        toast.error('An error occurred during sign up');
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error('An error occurred during sign up');
      }

      console.error('Signup Failed:', err);
    }
  }

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-0 text-gray-800">User Sign Up</h1>
          </div>
        </div>
        <div className="container-fluid">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
