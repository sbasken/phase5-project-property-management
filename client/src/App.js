import React from 'react'
import NavBar from './components/Nav/NavBar';
import Home from './components/Home/Home';
import About from './components/About/About';
import PropertyPage from './components/Property/PropertyPage';
import ExpensePage from './components/Expense/ExpensePage';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Units from './components/Property/Units/Units';
import NewProperty from './components/Property/NewProperty';
import NewUnit from './components/Property/Units/NewUnit';
import EditProperty from './components/Property/EditProperty';
import NewExpense from './components/Expense/NewExpense';
import EditExpense from './components/Expense/EditExpense';
import ReportPage from './components/Expense/Reports/ReportPage';
import Lease from './components/Property/Leases/Lease';
import NewLease from './components/Property/Leases/NewLease';

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
        <Route path='/properties/add-new' element={<NewProperty currentUser={currentUser}/>} />
        <Route path='/expenses' element={<ExpensePage />} />
        <Route path='/expenses/add-new' element={<NewExpense />} />
        <Route path='/expenses/:id' element={<EditExpense/>} />
        <Route path='/expenses/reports/:id' element={<ReportPage />} />
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/properties/:id/units/add-new' element={<NewUnit />} />
        <Route path='/properties/:id/units/:unitid/lease' element={<Lease />} />
        <Route path='/properties/:id/units/:unitid/lease/add-new' element={<NewLease />} />
      </Routes>
      </div>
    </div>

  )
}

export default App;
