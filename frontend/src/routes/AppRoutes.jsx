import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
// import MentorPage from "../pages/MentorPage";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<AdminPage />} />
        {/* <Route path="/mentor" element={<MentorPage />} />
        <Route path="*" element={<NotFound />} /> */}
    </Routes>
);

export default AppRoutes;
