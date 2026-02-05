import React, { useEffect, useState } from "react";

function FlaggedDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/drivers/flagged")
      .then(res => res.json())
      .then(data => {
        console.log("FLAGGED DRIVERS:", data);

        if (Array.isArray(data)) {
          setDrivers(data);
        } else {
          console.error("Expected array, got:", data);
          setDrivers([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setDrivers([]);
      });
  }, []);

  if (!drivers || drivers.length === 0) {
    return <p>No flagged drivers 🚫</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>GPS Anomalies</th>
          <th>Anomaly Score</th>
          <th>Risk Score</th>
          <th>Risk Level</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map(d => (
          <tr key={d.driverId}>
            <td>{d.driverId}</td>
            <td>{d.gpsAnomalies}</td>
            <td>{d.anomalyScore.toFixed(3)}</td>
            <td>{d.riskScore.toFixed(2)}</td>
            <td style={{ color: "red", fontWeight: "bold" }}>
              {d.riskLevel}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FlaggedDrivers;
