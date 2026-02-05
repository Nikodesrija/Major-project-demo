

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import GpsUpload from "./components/GpsUpload";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/admin/gps-upload" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/gps-upload" element={<GpsUpload />} />
      </Routes>
    </Router>
  );
}

export default App;

/*import React from "react";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return <AdminDashboard />;
}

export default App;
*/