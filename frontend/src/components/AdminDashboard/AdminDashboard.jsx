import React from "react";
import { Link } from "react-router-dom";
// import "./AdminDashboard.css";

const AdminDashboard = () => (
    <div className="admin-dashboard">
        <h1>Admin Panel</h1>
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/mentor">Mentor View</Link>
        </nav>
    </div>
);

export default AdminDashboard;
