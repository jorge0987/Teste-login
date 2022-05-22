
import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import SignIn from "../../src/pages/signIn/index";
import SignUp from "../../src/pages/signUp/index";

const RoutesList = () => (
  <Routes>
    <Route path="/" element={<SignUp />} />
    
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />


    <Route path="*" element={<SignUp />} />
  </Routes>
);

export default RoutesList;
