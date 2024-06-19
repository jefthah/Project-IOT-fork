import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoHappy,IoCloudyNightOutline  } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

const useLdrData = () => {
	const [ldrDataDetail, setldrDataDetail] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://backend-ta-iot.vercel.app/get-data-detail-ldr/sawah1");
				console.log("API Response:", response.data);
				const sensorData = response.data;
				if (Array.isArray(sensorData)) {
					console.log("Sensor Data:", sensorData);
					setldrDataDetail(sensorData);
				} else {
					console.error("Invalid data format: expected an array");
					setldrDataDetail([]); // Set empty data if format is invalid
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setldrDataDetail([]); // Set empty data if error occurs
			} finally {
				setIsLoading(false); // Set loading to false
			}
		};

		fetchData();
	}, []);

	return { isLoading, data: ldrDataDetail[0] };
};


const SatisfactionRate = () => {
	const { info, gradients } = colors;
	const { cardContent } = gradients;
	const { isLoading, data } = useLdrData();

	return (
		<Card sx={{ height: '340px' }}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='4px'>
					LDR Tracking
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='20px'>
					From Photoresistor-Sensor
				</VuiTypography>
				<VuiBox sx={{ alignSelf: 'center', justifySelf: 'center', zIndex: '-1' }}>
					<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress variant='determinate' value={60} size={170} color='info' />
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox
								sx={{
									background: info.main,
									transform: 'translateY(-50%)',
									width: '50px',
									height: '50px',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<IoCloudyNightOutline  size='30px' color='#fff' />
							</VuiBox>
						</VuiBox>
					</VuiBox>
				</VuiBox>
				<VuiBox
					sx={({ breakpoints }) => ({
						width: '90%',
						padding: '18px 22px',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						height: '82px',
						mx: 'auto',
						borderRadius: '20px',
						background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
						transform: 'translateY(-90%)',
						zIndex: '1000'
					})}>
					<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						0
					</VuiTypography>
					<VuiBox
						flexDirection='column'
						display='flex'
						justifyContent='center'
						alignItems='center'
						sx={{ minWidth: '80px' }}>
						{!isLoading ? (
							<VuiTypography color='white' variant='h3'>
								{data}
							</VuiTypography>
						) : (
							<VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
								Loading...
							</VuiTypography>
						)}
					</VuiBox>
					<VuiTypography color='text' variant='caption' display='inline-block' fontWeight='regular'>
						100000
					</VuiTypography>
				</VuiBox>
			</VuiBox>
		</Card>
	);
};

export default SatisfactionRate;
