import logo from './logo.svg';
import './App.css';
import Home from '../src/pages/Home.js'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar.js';
import Login from './users/Login.js';
import Signup from './users/Signup.js';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
