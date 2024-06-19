// ./src/layouts/dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Switch from '@mui/material/Switch';
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

import { IoWallet, IoPower } from "react-icons/io5";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import sawah1Grafik from "./data/sawah1Grafik";
import sawah2Grafik from "./data/sawah2Grafik";
import { getLineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";

function Dashboard() {
  const { isLoading, data } = sawah1Grafik();
  const { isLoading1, dataSawah2 } = sawah2Grafik();
  const [categories, setCategories] = useState([]);
  const [categoriesSawah2, setCategoriesSawah2] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCategoriesSawah2, setLoadingCategoriesSawah2] = useState(true);

  // SERVO_1
  const [servo, setServo] = useState(false);

  useEffect(() => {
    const getServo1State = async () => {
      try {
        const response = await axios.get('https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json');
        const servo1State = response.data.servo1;
        setServo(servo1State);
      } catch (error) {
        console.error('Error fetching servo1 state:', error);
      }
    };

    getServo1State();
    const interval = setInterval(getServo1State, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSwitchServo = async (event) => {
    const checked = event.target.checked;
    setServo(checked);

    try {
      // Update data to Firebase Realtime Database
      const response = await axios.patch(
        'https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json',
        { servo1: checked }
      );

      console.log('Data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // SERVO_2
  const [servo2, setServo2] = useState(false);

  useEffect(() => {
    const getServo2State = async () => {
      try {
        const response = await axios.get('https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json');
        const servo2State = response.data.servo2;
        setServo2(servo2State);
      } catch (error) {
        console.error('Error fetching servo2 state:', error);
      }
    };

    getServo2State();
    const interval = setInterval(getServo2State, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSwitchServo2 = async (event) => {
    const checkedServo2 = event.target.checked;
    setServo2(checkedServo2);

    try {
      // Update data to Firebase Realtime Database
      const response = await axios.patch(
        'https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json',
        { servo2: checkedServo2 }
      );

      console.log('Data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // SERVO_3
  const [servo3, setServo3] = useState(false);

  useEffect(() => {
    const getServo3State = async () => {
      try {
        const response = await axios.get('https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json');
        const servo3State = response.data.servo3;
        setServo3(servo3State);
      } catch (error) {
        console.error('Error fetching servo2 state:', error);
      }
    };

    getServo3State();
    const interval = setInterval(getServo3State, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSwitchServo3 = async (event) => {
    const checkedServo3 = event.target.checked;
    setServo3(checkedServo3);

    try {
      // Update data to Firebase Realtime Database
      const response = await axios.patch(
        'https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json',
        { servo3: checkedServo3 }
      );

      console.log('Data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  // SERVO_4
  const [servo4, setServo4] = useState(false);

  useEffect(() => {
    const getServo4State = async () => {
      try {
        const response = await axios.get('https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json');
        const servo4State = response.data.servo4;
        setServo4(servo4State);
      } catch (error) {
        console.error('Error fetching servo2 state:', error);
      }
    };

    getServo4State();
    const interval = setInterval(getServo4State, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSwitchServo4 = async (event) => {
    const checkedServo4 = event.target.checked;
    setServo4(checkedServo4);

    try {
      // Update data to Firebase Realtime Database
      const response = await axios.patch(
        'https://uas-iot-25b4f-default-rtdb.firebaseio.com/.json',
        { servo4: checkedServo4 }
      );

      console.log('Data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const { gradients } = colors;
  const { cardContent } = gradients;

  useEffect(() => {
    // Fetch categories data
    axios.get('https://backend-ta-iot.vercel.app/get-data-waktu/sawah1')
      .then(response => {
        const allData = response.data;
        const lastFiveData = allData.slice(-12); // Get the last five data points
        setCategories(lastFiveData);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      });

  }, []);

  // Get the line chart options with the categories
  const lineChartOptionsDashboard = getLineChartOptionsDashboard(categories);

  useEffect(() => {
    // Fetch categories data
    axios.get('https://backend-ta-iot.vercel.app/get-data-waktu/sawah2')
      .then(response => {
        const allData = response.data;
        const lastFiveData = allData.slice(-12); // Get the last five data points
        setCategoriesSawah2(lastFiveData);
        console.log('data: ', lastFiveData);
        setLoadingCategoriesSawah2(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoadingCategoriesSawah2(false);
      });
  }, []);

  // Get the line chart options with the categories
  const lineChartOptionsDashboardSawah2 = getLineChartOptionsDashboard(categoriesSawah2);

  return (
    <DashboardLayout>
      <VuiBox py={3}>
        {loadingCategories && loadingCategoriesSawah2 ? (
          <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
            Loading...
          </VuiTypography>
        ) : (
          <>
            <VuiBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    count="Servo 1"
                    percentage={{ color: "success", text: "Garden 1" }}
                    icon={{ color: "info", component: <IoPower size="22px" color="white" /> }}
                    switchControl={
                      <Switch
                        checked={servo}
                        onChange={handleSwitchServo}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    count="Servo 2"
                    percentage={{ color: "success", text: "Garden 1" }}
                    icon={{ color: "info", component: <IoPower size="22px" color="white" /> }}
                    switchControl={
                      <Switch
                        checked={servo2}
                        onChange={handleSwitchServo2}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    count="Servo 1"
                    percentage={{ color: "success", text: "Garden 2" }}
                    icon={{ color: "info", component: <IoPower size="22px" color="white" /> }}
                    switchControl={
                      <Switch
                        checked={servo3}
                        onChange={handleSwitchServo3}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MiniStatisticsCard
                    count="Servo 2"
                    percentage={{ color: "success", text: "Garden 2" }}
                    icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
                    switchControl={
                      <Switch
                        checked={servo4}
                        onChange={handleSwitchServo4}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </VuiBox>
            <VuiBox mb={3}>
              <Grid container spacing="18px">
                <Grid item xs={12} lg={12} xl={5}>
                  <WelcomeMark />
                </Grid>
                <Grid item xs={12} lg={6} xl={3}>
                  <SatisfactionRate />
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <ReferralTracking />
                </Grid>
              </Grid>
            </VuiBox>
            <VuiBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} xl={7}>
                  <Card>
                    <VuiBox sx={{ height: "100%" }}>
                      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                        Garden 1
                      </VuiTypography>
                      <VuiBox display="flex" alignItems="center" mb="40px">
                        <VuiTypography variant="button" color="success" fontWeight="bold">
                          <VuiTypography variant="button" color="success" fontWeight="bold">
                            in 2024
                          </VuiTypography>
                        </VuiTypography>
                      </VuiBox>
                      <VuiBox sx={{ height: "310px" }}>
                        {!isLoading ? (
                          <LineChart
                            lineChartData={data}
                            lineChartOptions={lineChartOptionsDashboard}
                          />
                        ) : (
                          <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                            Loading...
                          </VuiTypography>
                        )}
                      </VuiBox>
                    </VuiBox>
                  </Card>
                </Grid>
                <Grid item xs={12} lg={6} xl={5}>
                  <Card>
                    <VuiBox sx={{ height: "100%" }}>
                      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                        Garden 2
                      </VuiTypography>
                      <VuiBox display="flex" alignItems="center" mb="40px">
                        <VuiTypography variant="button" color="success" fontWeight="bold">
                          in 2024
                        </VuiTypography>
                      </VuiBox>
                      <VuiBox sx={{ height: "310px" }}>
                        {!isLoading ? (
                          <LineChart
                            lineChartData={dataSawah2}
                            lineChartOptions={lineChartOptionsDashboardSawah2}
                          />
                        ) : (
                          <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                            Loading...
                          </VuiTypography>
                        )}
                      </VuiBox>
                    </VuiBox>
                  </Card>
                </Grid>
              </Grid>
            </VuiBox>
          </>
        )}
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
