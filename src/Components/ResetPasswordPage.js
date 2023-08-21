import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { port } from '../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if token is undefined or empty
        if (!token) {
            return navigate('/invalidToken');
        }
    }, [token, navigate]);


    // Check if token is undefined or empty
    if (!token) {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
                            <h1 className="h3 mb-0 text-gray-800">Invalid Token</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const handleResetPassword = async () => {

        try {
            const response = await axios.post(`${port}/reset-password`, {
                token: token,
                newPassword: password
            });
            console.log(response);
            // Checking if the status code is 200 (OK) then navigating to Login page for Logging In
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/logIn');
                toast.info("Enter the Email and New password to Login");
            } else {
                console.log('Error resetting Password');
            }
        } catch (err) {
            toast.error(err.response.data.message);
            console.error("Login Failed:", err);
        }
    }

    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <div className="container-fluid">
                    <div className="d-sm-flex align-items-center justify-content-center mb-4" style={{ textAlign: 'center' }}>
                        <h1 className="h3 mb-0 text-gray-800">Reset Password Page</h1>
                    </div>
                </div>
                <div className="container-fluid">
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleResetPassword}>
                            Reset Password
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
