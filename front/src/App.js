import React from 'react';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import EventDetail from './containers/EventDetail/EventDetail';

import { Container } from "react-bootstrap";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Container>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/events/:event_id" exact component={EventDetail} />
          </Container>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
