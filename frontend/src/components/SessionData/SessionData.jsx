import React, { useState } from "react";
import CSVUploader from "./CSVUploader";
import "../../styles/sessionDate.css";

const SessionData = () => {
    const [sessions, setSessions] = useState([]);
    const [dateFilter, setDateFilter] = useState("all");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
    const [platformFee, setPlatformFee] = useState(10); // default 10%
    const [gst, setGst] = useState(18); // default 18%
    const [deductions, setDeductions] = useState(0);


    const addParsedSessions = (data) => {
        const cleaned = data.map((row) => ({
            mentorName: row["Mentor Name"],
            sessionDate: row["Session Date"],
            sessionType: row["Session Type"],
            duration: parseFloat(row["Duration (mins)"]),
            rate: parseFloat(row["Rate per Hour (₹)"]),
        }));
        setSessions((prev) => [...prev, ...cleaned]);
    };

    const getFilteredSessions = () => {
        if (dateFilter === "all") return sessions;
        const now = new Date();
        let startDate;

        if (dateFilter === "custom") {
            if (!customStart || !customEnd) return sessions;
            startDate = new Date(customStart);
            const endDate = new Date(customEnd);
            return sessions.filter((s) => {
                const d = new Date(s.sessionDate);
                return d >= startDate && d <= endDate;
            });
        }

        const days = parseInt(dateFilter);
        startDate = new Date(now.setDate(now.getDate() - days));
        return sessions.filter((s) => new Date(s.sessionDate) >= startDate);
    };
    const filteredSessions = getFilteredSessions();

    const getFinalPayout = () => {
        const baseAmount = filteredSessions.reduce(
            (sum, s) => sum + (s.duration / 60) * s.rate,
            0
        );

        const platformFeeAmount = (platformFee / 100) * baseAmount;
        const gstAmount = (gst / 100) * baseAmount;
        const finalAmount = baseAmount - platformFeeAmount - deductions + gstAmount;

        return {
            baseAmount,
            platformFeeAmount,
            gstAmount,
            deductions,
            finalAmount,
        };
    };

    const { baseAmount, platformFeeAmount, gstAmount, finalAmount } = getFinalPayout();
      
    return (
        <div className="session-data">
            <h2>Session Data Collection</h2>
            <CSVUploader onDataParsed={addParsedSessions} />

            {/* 🔍 Filter Controls */}
            <div className="filter-controls">
                <label>Filter:</label>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="7">Last 7 Days</option>
                    <option value="15">Last 15 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                </select>

                {dateFilter === "custom" && (
                    <>
                        <input
                            type="date"
                            value={customStart}
                            onChange={(e) => setCustomStart(e.target.value)}
                        />
                        <input
                            type="date"
                            value={customEnd}
                            onChange={(e) => setCustomEnd(e.target.value)}
                        />
                    </>
                )}
            </div>

            {/* 📊 Table */}
            <table className="session-table">
                <thead>
                    <tr>
                        <th>Mentor</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Duration (mins)</th>
                        <th>Rate/hr (₹)</th>
                        <th>Total (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSessions.map((session, index) => (
                        <tr key={index}>
                            <td>{session.mentorName}</td>
                            <td>{session.sessionDate}</td>
                            <td>{session.sessionType}</td>
                            <td>{session.duration}</td>
                            <td>{session.rate}</td>
                            <td>{((session.duration / 60) * session.rate).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 💰 Payout Summary */}
            <div className="payout-summary">
                <h3>Payout Summary</h3>

                <div className="fee-inputs">
                    <label>
                        Platform Fee (%):
                        <input type="number" value={platformFee} onChange={(e) => setPlatformFee(+e.target.value)} />
                    </label>
                    <label>
                        GST (%):
                        <input type="number" value={gst} onChange={(e) => setGst(+e.target.value)} />
                    </label>
                    <label>
                        Deductions (₹):
                        <input type="number" value={deductions} onChange={(e) => setDeductions(+e.target.value)} />
                    </label>
                </div>

                <ul>
                    <li><strong>Base Amount:</strong> ₹{baseAmount.toFixed(2)}</li>
                    <li><strong>Platform Fee:</strong> -₹{platformFeeAmount.toFixed(2)}</li>
                    <li><strong>GST:</strong> +₹{gstAmount.toFixed(2)}</li>
                    <li><strong>Deductions:</strong> -₹{deductions.toFixed(2)}</li>
                    <li><strong>Final Payable:</strong> ₹{finalAmount.toFixed(2)}</li>
                </ul>
            </div>
        </div>
    );
};

export default SessionData;
