import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Users from './components/Users';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Route exact path="/" render={props => <Home {...props}/>}/>
      <Route path="/login" render={props => <Login {...props}/>}/>
      <Route path="/register" render={props => <Register {...props}/>}/>
      <PrivateRoute exact path="/users" component={Users}/>
    </div>
  );
}

export default App;
