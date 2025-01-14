import React, { useState } from 'react'
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { saveAuthCredentials } from '../utils/Auth';

export default function Login() {

    let navigate = useNavigate();

    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include"
        });

        if (response.ok) {
          saveAuthCredentials(username, password);
          
          navigate("/")
        } else {
           const message = await response.text();
           setError(message);
        }
      } catch (error) {
        setError("Login failed");
      }
    };
    
  return (
    <div className='container-login'>

      <div className='header'>
        <img src='/imgs/to-do-list.png'></img>
        <Link className='title' to={"/"}>To-Do List</Link>
      </div>

      <div className='login-content'>
        <form onSubmit={handleSubmit}>
          <div className='login'>
              <label>Username:</label>
              <input 
                type='text' 
                placeholder='Type your username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} required />
              <label>Password:</label>
              <input 
                type='password' 
                placeholder='Type your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} required/>
              <button className='login-btn'>Login</button>
          </div>

          <div className='signup'>
              <Link className='signup-button' to={"/signup"}>Don't have an account? Sign up!</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
