// src/layouts/dashboard/data/sawah1Grafik.js
import { useState, useEffect } from "react";
import axios from "axios";

const sawah1Grafik = () => {
  const [HummidityData, setHummidityData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-ta-iot.vercel.app/get-data-humidity/sawah1");
        console.log("API Response:", response.data);
        const sensorData = response.data;
        if (Array.isArray(sensorData)) {
          console.log("Sensor Data:", sensorData);
          setHummidityData(sensorData);
        } else {
          console.error("Invalid data format: expected an array");
          setHummidityData([]); // Set empty data if format is invalid
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHummidityData([]); // Set empty data if error occurs
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-ta-iot.vercel.app/get-data-temp/sawah1");
        console.log("API Response:", response.data);
        const sensorData = response.data;
        if (Array.isArray(sensorData)) {
          console.log("Sensor Data:", sensorData);
          setTempData(sensorData);
        } else {
          console.error("Invalid data format: expected an array");
          setTempData([]); // Set empty data if format is invalid
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTempData([]); // Set empty data if error occurs
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  const lineChartDataDashboard = (HummidityData, tempData) => [
    {
      name: "Hummidity",
      data: HummidityData,
    },
    {
      name: "Temperature",
      data: tempData,
    },
  ];

  const data = lineChartDataDashboard(HummidityData, tempData);

  return { isLoading, data };
};

export default sawah1Grafik;
