import React from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import PropertyPage from './components/PropertyPage';
import ExpensePage from './components/ExpensePage';
import Profile from './components/Profile';
import Login from './components/Login';
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
        <Route path='/profile' element={<Profile />} />
      </Routes>
      </div>
    </div>

  )
}

export default App;
