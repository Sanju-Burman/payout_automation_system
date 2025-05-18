import React from "react";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import SessionData from "../components/SessionData/SessionData";
// import PayoutCalculator from "../components/PayoutCalculator/PayoutCalculator";
// import ReceiptManager from "../components/ReceiptManager/ReceiptManager";
// import Chat from "../components/Chat/Chat";
// import AuditLogs from "../components/AuditLogs/AuditLogs";
// import TestMode from "../components/TestMode/TestMode";

const AdminPage = () => {
    return (
        <div>
            <AdminDashboard />
            <SessionData />
            {/* <PayoutCalculator />
            <ReceiptManager />
            <Chat />
            <AuditLogs />
            <TestMode /> */}
        </div>
    );
};

export default AdminPage;
