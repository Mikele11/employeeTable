import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Update from './components/Upd';
import AddDepart from './components/AddDepart';
import View from './components/View';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create" component={Create} />
        <Route path="/view" component={View} />
        <Route path="/adddepart" component={AddDepart} />
        <Route path="/update" component={Update} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);