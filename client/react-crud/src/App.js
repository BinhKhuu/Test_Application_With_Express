import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import TutorialsList from './components/TutorialsList';
import AddTutorials from './components/AddTutorials';
import Tutorial from './components/Tutorial';
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
      <div className="container mt-3">
        <Routes>
          <Route exact path={'/'} element={<TutorialsList tutorials={[]} />} />
          <Route
            exact path={'/tutorials'}
            element={<TutorialsList tutorials={[]} />}
          />
          <Route exact path={'/Add'} element={<AddTutorials />} />
          <Route exact path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
