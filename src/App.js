
import React,{useState} from 'react';
import Login from './components/login'
import Main from './components/Main';
import User from './User'
import Event from './Events'


import {AppBar,Toolbar,CssBaseline,Button} from '@material-ui/core'
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import Transection from './Transection';

const App=()=>{

return (
  <BrowserRouter>
  <div className="container">

  <Routes>

    <Route path="/"  element={<Login/>}/>
    <Route path="/Main" element={<Main/>}/>
    <Route path="/User" element={<User/>}/>
    <Route path="/Event" element={<Event/>}/>
    <Route path="/Transection" element={<Transection/>}/>


   
  </Routes>
  </div>

  </BrowserRouter>
 )
}

export default App;
