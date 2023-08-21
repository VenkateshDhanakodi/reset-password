import React, {useEffect } from 'react'
import { port } from '../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordRouting = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const tokenResponse = async () => {
            try {
                const response = await axios.get(`${port}/reset-password/${token}`);
                // Checking if the status code is 200 (OK) then navigating to Login page for Logging In
                if (response.status === 200) {
                    navigate(`/updatePassword/${token}`);
                } else {
                    console.log('Error in token Validation');
                }
            } catch (err) {
                toast.error(err.response.data.message);
                console.error("Login Failed:", err);
            }
        }
        tokenResponse();
    }, [token, navigate]);

    return <div>Routing to update the password</div>;
};

export default ResetPasswordRouting;