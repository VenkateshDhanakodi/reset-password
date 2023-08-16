import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { port } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');

    try {
      const response = await axios.post(`${port}/signupLogin/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast(response.data.message);
        navigate('/dashboard/mentor-dashboard');
      } else {
        setError('Incorrect email or password.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during login.');
      }
      console.error('Login Failed:', err);
    }
  };

  const handleForgetPassword = () => {
    navigate('/forgotPassword');
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div
            className="d-sm-flex align-items-center justify-content-center mb-4"
            style={{ textAlign: 'center' }}
          >
            <h1 className="h3 mb-0 text-gray-800">User Login</h1>
          </div>
        </div>
        <div className="container-fluid">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{' '}
            <Button variant="danger" onClick={handleForgetPassword}>
              Forget Password
            </Button>
            <br />
            <br />
            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            <p>
              <span
                style={{
                  borderBottom: '0.2em solid blue',
                  paddingBottom: '0.1em',
                  color: 'grey',
                }}
              >
                Enter the same Email and Password submitted on Sign Up page
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
