import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { port } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgetPassword() {
  let [email, setEmail] = useState('');
  let handleSubmit = async (e) => {
    e.preventDefault(e); // Prevent default form submission

    try {
      let response = await axios.post(`${port}/signupLogin/forgot-password`, {
        email: email
      });
      if(response.status === 200){
        toast.info(response.data.message);
      }
    }
    catch (err) {
        toast.error(err.response.data.message);
      console.error("Error resetting password:", err);
    }
  }

  return <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
          <h1 className="h3 mb-0 text-gray-800">Forget Password</h1>
        </div>
      </div>
      <div className="container-fluid">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter Registered Email Address" onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group><br/>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </div>
}
export default ForgetPassword