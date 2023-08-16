import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function SignUpLogin() {
  const navigate = useNavigate();
  
  const handleSignUp = () => {
    navigate('/signUp');
  };

  const handleLogin = () => {
    navigate('/logIn');
  };
  
  return (
    <div className='container-fluid' id="signUpLogin">
      <h2 style={{ textAlign: "center", paddingTop: "1em" }}>Student Mentor Managment with Password Reset</h2>
      <div id="signInLogiButton" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button variant='primary' onClick={handleSignUp}>Sign Up</Button> &nbsp;&nbsp;
        <Button variant='primary' onClick={handleLogin}>Login</Button>
      </div>
      <p style={{ textAlign: "center", paddingTop: "1em" }}>
        If you are new here, Sign Up. Once you've signed up, log in to proceed.
        If you've already signed up, you can directly log in to proceed.
      </p>
    </div>
  );
}

export default SignUpLogin;
