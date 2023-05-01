import React from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import PropertyPage from './components/PropertyPage';
import ExpensePage from './components/ExpensePage';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Units from './components/Units';
import NewProperty from './components/NewProperty';
import NewUnit from './components/NewUnit';
import EditProperty from './components/EditProperty';

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from'react';
import { useNavigate } from 'react-router-dom'

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json()
          .then((user) => setCurrentUser(user)
          )}
      });
  }, []);

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
      .then((r) => {
        if (r.ok) {
          setCurrentUser(null)
        }
        navigate('/')
      })
    }

  return (
    <div>
      <div className='ui row'>
        <NavBar handleLogout={handleLogout} currentUser={currentUser}/>
      </div>
      <div className='ui row'> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/properties' element={<PropertyPage />} />
        <Route path='/properties/:id' element={<EditProperty currentUser={currentUser}/>} />
        <Route path='/properties/:id/units' element={<Units />} />
        <Route path='/newProperty' element={<NewProperty currentUser={currentUser}/>} />
        <Route path='/expense' element={<ExpensePage />} />
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/newUnit' element={<NewUnit />} />
      </Routes>
      </div>
    </div>

  )
}

export default App;
