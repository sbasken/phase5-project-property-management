import React from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import PropertyPage from './components/PropertyPage';
import Login from './components/Login';

function App() {

  return (
    <Container>
      <NavBar />
      <h1>Property Panda</h1>
      <Home />
      <PropertyPage />
      <Login />
    </Container>

  )
}

export default App;
