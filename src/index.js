import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import "./index.css"
import Error404 from "./views/Error404";
import WithContainer from "./views/WithContainer";
import {loggedRoutesPaths} from "./assets/properties";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={(props) => <LoginView {...props}/>}/>
      <Route exact path="/registration" component={RegistrationView}/>
      <Route exact path={loggedRoutesPaths} component={WithContainer}/>
      <Route exact path="/*" component={Error404}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();