import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// async function loginUser(credentials) {
//  return fetch('http://localhost:3000/users/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

export default function Login({ setToken }) {
  
  const [username, setUserName] = useState('Prince' );
  const [password, setPassword] = useState('test@123');
  const [loggedIn, setLoggedIn] = useState(false);

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username==="prince" && password==="test@123"){
    setLoggedIn(true);


    }
    else{
      console.log("invalid");
      setError("Invalid credentials");
    }
    


    
   
    

    // const response = await loginUser({
    //   username,
    //   password
    // });
    // console.log(response);
    // if(response.success){
    //     setToken("ABCDEF");
    //     setError(false)
    // } else {
    //     setError(true)
    // }
    
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
          <Link to="/dashboard"><button type="submit" onClick={handleSubmit}>Login</button></Link>  
          {loggedIn &&  <Redirect to ='/dashboard' />}
           <div style={{color:"red"}}>{error}</div>
           
        
        </div>
      </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};