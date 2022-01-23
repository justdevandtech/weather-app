import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Weather } from './components/Weather';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="app">
      <h1 className='text-center'>Weather App</h1>
      <Container>
      <Weather />
      </Container>
    </div>
  );
}

export default App;
