import React from "react";
import { BrowserRouter } from "react-router-dom";

//import { makeStyles } from "@material-ui/core/styles";
import Routes from "../src/routes";
//import Container from "@material-ui/core/Container";
//import Paper from "@material-ui/core/Paper";
import "./App.css";



import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
      </BrowserRouter>
    
      
  );
}

export default App;
