import axios from "axios";

const BASE_URL = "http://localhost:8080/api/drivers";

export const fetchDrivers = () =>
  axios.get(BASE_URL);

export const blockDriver = (driverId, reason) =>
  axios.post(`${BASE_URL}/block`, null, {
    params: { driverId, reason }
  });

export const unblockDriver = (driverId) =>
  axios.post(`${BASE_URL}/unblock`, null, {
    params: { driverId }
  });
