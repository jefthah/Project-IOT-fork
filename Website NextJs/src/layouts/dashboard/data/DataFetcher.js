import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get("https://coba-e6c01-default-rtdb.asia-southeast1.firebasedatabase.app/sensor1.json");
    console.log("API Response:", response);
    const sensorData = response.data;
    if (Array.isArray(sensorData)) {
      console.log("Sensor Data:", sensorData);
      return sensorData;
    } else {
      console.error("Invalid data format: expected an array");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
