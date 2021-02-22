import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
 return fetch('http://localhost:3000/users/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser({
      username,
      password
    });
    console.log(response);
    if(response.success){
        setToken("ABCDEF");
        setError(false)
    } else {
        setError(true)
    }
    
  }

  return(
    <div className="login-wrapper">
      <div className="login-container">
      
      <h1 className="login-h">Login to DigiHealth</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="login-h">Username</p>
          <input type="text" name="name" id="name" placeholder="username"  onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p className="login-h">Password</p>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <div style={{color:"red"}}>Invalid Credentials</div>}
      </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};