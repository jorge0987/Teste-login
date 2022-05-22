import './App.css';
import { BrowserRouter } from "react-router-dom";
import RoutesList from "../src/services/routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
