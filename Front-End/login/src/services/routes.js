import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../features/home";

const RoutesList = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="*" element={<Home />} />
  </Routes>
);

export default RoutesList;
