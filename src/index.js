import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import "./index.css"
import Error404 from "./views/Error404";
import WithContainer from "./views/WithContainer";
import CategoriesView from "./views/CategoriesView";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<LoginView/>}/>
        <Route path="registration" element={<RegistrationView/>}/>
        <Route path="user" element={<WithContainer/>}>
          <Route path="categories" element={<CategoriesView/>}/>
        </Route>
        <Route path="*" element={<Error404/>}/>
      </Route>

    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();