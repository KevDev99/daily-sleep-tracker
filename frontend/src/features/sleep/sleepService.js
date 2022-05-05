import axios from "axios";

const API_URL = "/api/sleep";

// Create sleep entry
const createSleepEntry = async (sleepData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, sleepData, config);

  return response.data;
};

// Fetch sleep entries
const getSleepEntries = async (token, daysBack) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/?daysBack=${daysBack}`, config);
  return response.data;
};

const sleepService = {
  createSleepEntry,
  getSleepEntries,
};

export default sleepService;
