import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import { Container } from "react-bootstrap";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Container>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </Container>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
