import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    blocked: 0,
    flagged: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
  });
  const [tableData, setTableData] = useState(null);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const driversRes = await axios.get("http://localhost:8080/api/drivers");
      const flaggedRes = await axios.get("http://localhost:8080/api/drivers/flagged");
      const drivers = driversRes.data;

      setStats({
        total: drivers.length,
        blocked: drivers.filter((d) => d.blocked).length,
        flagged: flaggedRes.data.length,
        highRisk: drivers.filter((d) => d.riskLevel === "HIGH").length,
        mediumRisk: drivers.filter((d) => d.riskLevel === "MEDIUM").length,
        lowRisk: drivers.filter((d) => d.riskLevel === "LOW").length,
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  const showTable = async (filter) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/drivers?risk=${filter}`);
      setTableData(res.data);
    } catch (err) {
      console.error("Table load failed", err);
    }
  };

  const pieData = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [stats.highRisk, stats.mediumRisk, stats.lowRisk],
        backgroundColor: ["#e74c3c", "#f39c12", "#2ecc71"],
      },
    ],
  };

  const barData = {
    labels: ["Total", "Flagged", "Blocked"],
    datasets: [
      {
        label: "Drivers Count",
        data: [stats.total, stats.flagged, stats.blocked],
        backgroundColor: "#3498db",
      },
    ],
  };
 const handleBlockToggle = (driverId, isBlocked) => {
  console.log("Admin action:", driverId, isBlocked ? "Unblock" : "Block");

  setTableData((prev) =>
    prev.map((d) =>
      d.driverId === driverId ? { ...d, blocked: !isBlocked } : d
    )
  );
};

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🚚 Admin Panel</h2>
        <nav>
          <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/admin/gps-upload")}>GPS Upload</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1>📊 Admin Analysis Dashboard</h1>

        {/* Toggle Summary Cards */}
        <button className="toggle-summary-btn" onClick={() => setShowSummary(!showSummary)}>
          {showSummary ? "Hide Summary Cards" : "Show Summary Cards"}
        </button>

        {/* Summary Cards */}
        {showSummary && (
          
          <div className="stats-grid">
            <div className="stat-card total" onClick={() => showTable("ALL")}>
              <h3>Total Drivers</h3>
              <p>{stats.total}</p>
            </div>

            <div className="stat-card flagged" onClick={() => showTable("FLAGGED")}>
              <h3>Flagged</h3>
              <p>{stats.flagged}</p>
            </div>

            <div className="stat-card risk" onClick={() => showTable("HIGH")}>
              <h3>High Risk</h3>
              <p>{stats.highRisk}</p>
            </div>

            <div className="stat-card blocked" onClick={() => showTable("BLOCKED")}>
              <h3>Blocked</h3>
              <p>{stats.blocked}</p>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card" onClick={() => showTable("HIGH")}>
            <h3>🚦 Risk Distribution</h3>
            <div className="small-chart">
              <Pie data={pieData} />
            </div>
          </div>

          <div className="chart-card" onClick={() => showTable("FLAGGED")}>
            <h3>📊 Driver Status Overview</h3>
            <div className="small-chart">
              <Bar data={barData} />
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        {tableData && (
          <div className="table-box">
            <h3>📋 Detailed Driver Info</h3>
            <table>
              <thead>
                <tr>
                  <th>Driver ID</th>
                  <th>Risk Level</th>
                  <th>Blocked</th>
                  <th>Total Deliveries</th>
                  <th>Cancellations</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((driver) => (
                  <tr key={driver.driverId}>
                    <td>{driver.driverId}</td>
                    <td>
        <span className={`risk-badge ${driver.riskLevel.toLowerCase()}`}>
          {driver.riskLevel}
        </span>
      </td>
                    <td>{driver.blocked ? "Yes" : "No"}</td>
                    <td>{driver.totalDeliveries}</td>
                    <td>{driver.cancellations}</td>
                     <td>
        <button
          className={`block-btn ${driver.blocked ? "unblock" : "block"}`}
          onClick={() => handleBlockToggle(driver.driverId, driver.blocked)}
        >
          {driver.blocked ? "Unblock" : "Block"}
        </button>
      </td>
                  </tr>
                ))}
                

              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;





/*import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    blocked: 0,
    flagged: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const driversRes = await axios.get("http://localhost:8080/api/drivers");
      const flaggedRes = await axios.get("http://localhost:8080/api/drivers/flagged");

      const drivers = driversRes.data;

      setStats({
        total: drivers.length,
        blocked: drivers.filter(d => d.blocked).length,
        flagged: flaggedRes.data.length,
        highRisk: drivers.filter(d => d.riskLevel === "HIGH").length,
        mediumRisk: drivers.filter(d => d.riskLevel === "MEDIUM").length,
        lowRisk: drivers.filter(d => d.riskLevel === "LOW").length
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };
  const pieData = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [stats.highRisk, stats.mediumRisk, stats.lowRisk],
        backgroundColor: ["#e74c3c", "#f39c12", "#2ecc71"]
      }
    ]
  };

  const barData = {
    labels: ["Total", "Flagged", "Blocked"],
    datasets: [
      {
        label: "Drivers Count",
        data: [stats.total, stats.flagged, stats.blocked],
        backgroundColor: "#3498db"
      }
    ]
  };

  return (
    <div className="dashboard">
      <h1>📊 Admin Analysis Dashboard</h1>
}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card warning">
          <h3>Flagged</h3>
          <p>{stats.flagged}</p>
        </div>

        <div className="stat-card danger">
          <h3>High Risk</h3>
          <p>{stats.highRisk}</p>
        </div>

        <div className="stat-card blocked">
          <h3>Blocked</h3>
          <p>{stats.blocked}</p>
        </div>
      </div>

    }
      <div className="charts-grid">
        <div className="chart-card">
          <h3>🚦 Risk Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart-card">
          <h3>📊 Driver Status Overview</h3>
          <Bar data={barData} />
        </div>
      </div>

      }
      <button
        className="admin-btn"
        onClick={() => navigate("/admin/gps-upload")}
      >
        📍 Upload GPS Trajectory
      </button>
    </div>
  );
}; 

export default AdminDashboard;*/


/*const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h1>📊 Admin Analysis Dashboard</h1>

      <div className="section">
        <h2>🚨 Risk & Driver Overview</h2>
        <DriverTable />
      </div>

      <div className="section">
        <h2>⚠️ Flagged Drivers</h2>
        <FlaggedDrivers />
      </div>
    </div>
  );
};

export default AdminDashboard;*/
