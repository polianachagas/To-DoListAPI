import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearAuthCredentials, getAuthCredentials } from '../utils/Auth';

export default function Navbar() {

  let navigate = useNavigate();
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('auth_username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  })

  const handleLogout = () => {
    try {
      clearAuthCredentials();
      const storedUsername = "";
      setUsername(storedUsername);
      navigate("/login");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const loadUsers=async()=> {
    try {
      const result = await axios.get("http://localhost:8080/users"); 
      setUsers(result.data);
    } catch(error) {
      console.error("Error loading the user: ", error);
    }
  }

  return (
    <nav className='navbar'>
        <h2>
          {username ? (
            <>
              <span>Hello, {username}!</span>
            </>
          ) : (
            <span>Hello</span>
          )}
        </h2>
        <>
        {username ? (
            <>
              <button className='btn-logout' onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <Link className='btn-login' to={"/login"}>Sign in | Sign up</Link>
          )}
        
        </>
    </nav>
  )
}
