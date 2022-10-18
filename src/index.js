import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginView from "./views/LoginView";
import "./index.css"


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginView/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();