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

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <div className='ui row'>
        <NavBar />
      </div>
      <div className='ui row'> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/properties' element={<PropertyPage />} />
        <Route path='/expense' element={<ExpensePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/units' element={<Units />} />
        <Route path='/newProperty' element={<NewProperty />} />
        <Route path='/newUnit' element={<NewUnit />} />
      </Routes>
      </div>
    </div>

  )
}

export default App;
