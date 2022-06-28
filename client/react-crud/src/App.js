import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Link} from 'react-router-dom';

const App = props => {
  return (
    <div role="application" className="App">
      <nav
        role="navigation"
        className="navbar navbar-expand navbar-dark bg-dark"
      >
        <a href="/tutorials" className="navbar-brand">
          Binh
        </a>
        <div className="navbar-nav mr-auto">
          <li id="ugh" className="nav-item">
            <Link to={'/tutorials'} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default App;
