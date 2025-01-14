import React, { useState } from 'react'
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {

    let navigate = useNavigate();

    const [user, addUser] = useState({
        username: "", 
        email: "", 
        password: ""
    });

    const{username, email, password} = user;

    const onInputChange=(e)=> {
        addUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
         try {
            await axios.post("http://localhost:8080/users", user);
            user.username = "";
            user.email = "";
            user.password = "";
            navigate("/login");
         } catch (error) {
            console.error("Error registering: ", error);
        }
    }

  return (
    <div className='container-signup'>

      <div className='header'>
        <img src='/imgs/to-do-list.png'></img>
        <Link className='title' to={"/"}>To-Do List</Link>
      </div>

      <div className='signup-content'>
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='signup'>
                <label>Username:</label>
                <input 
                    type='text' 
                    placeholder='Type your username'
                    className='form-control'
                    name='username'
                    value={username}
                    onChange={(e) => onInputChange(e)}
                    />
                <label>Email:</label>
                <input 
                    type='text' 
                    placeholder='Type your email'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    />
                <label>Password:</label>
                <input 
                    type='password' 
                    placeholder='Type your password'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={(e) => onInputChange(e)}   
                />
                <button to={"/login"} type='submit' className='signup-btn'>Sign up!</button>
            </div>
        </form>

      </div>
    </div>
  )
}
