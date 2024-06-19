import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { IoThermometer   } from 'react-icons/io5';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

const useTempData = () => {
    const [tempDataDetail, setTempDataDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://backend-ta-iot.vercel.app/get-data-detail-temp/sawah1");
                console.log("API Response:", response.data);
                const sensorData = response.data;
                if (Array.isArray(sensorData)) {
                    console.log("Sensor Data:", sensorData);
                    setTempDataDetail(sensorData);
                } else {
                    console.error("Invalid data format: expected an array");
                    setTempDataDetail([]); // Set empty data if format is invalid
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setTempDataDetail([]); // Set empty data if error occurs
            } finally {
                setIsLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, []);

    return { isLoading, data: tempDataDetail[0]?.toString() };
};

function ReferralTracking() {
    const { info, gradients } = colors;
    const { cardContent } = gradients;
    const { isLoading, data } = useTempData();

    return (
        <Card
            sx={{
                height: '100%',
                background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
            }}>
            <VuiBox sx={{ width: '100%' }}>
                <VuiBox
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ width: '100%' }}
                    mb='40px'>
                    <VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
                        Temperature Tracking
                    </VuiTypography>
                    <VuiBox
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        bgColor='#22234B'
                        sx={{ width: '50px', height: '50px', cursor: 'pointer', borderRadius: '12px' }}>
                        <IoThermometer  size='40px' color='#fff' />
                    </VuiBox>
                </VuiBox>
                <VuiBox
                    display='flex'
                    sx={({ breakpoints }) => ({
                        [breakpoints.up('xs')]: {
                            flexDirection: 'column',
                            gap: '16px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        [breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }
                    })}>
                    <Stack
                        direction='column'
                        spacing='20px'
                        width='500px'
                        maxWidth='50%'
                        sx={({ breakpoints }) => ({
                            mr: 'auto',
                            [breakpoints.only('md')]: {
                                mr: '75px'
                            },
                            [breakpoints.only('xl')]: {
                                width: '500px',
                                maxWidth: '40%'
                            }
                        })}>
                        <VuiBox
                            display='flex'
                            width='220px'
                            p='20px 22px'
                            flexDirection='column'
                            sx={({ breakpoints }) => ({
                                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                borderRadius: '20px',
                                [breakpoints.up('xl')]: {
                                    maxWidth: '110px !important'
                                },
                                [breakpoints.up('xxl')]: {
                                    minWidth: '180px',
                                    maxWidth: '100% !important'
                                }
                            })}>
                            <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                Category
                            </VuiTypography>
                            <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                Garden
                            </VuiTypography>
                        </VuiBox>
                        <VuiBox
                            display='flex'
                            width='220px'
                            p='20px 22px'
                            flexDirection='column'
                            sx={({ breakpoints }) => ({
                                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                borderRadius: '20px',
                                [breakpoints.up('xl')]: {
                                    maxWidth: '110px !important'
                                },
                                [breakpoints.up('xxl')]: {
                                    minWidth: '180px',
                                    maxWidth: '100% !important'
                                }
                            })}>
                            <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                Sensor
                            </VuiTypography>
                            <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                Ntc-Temperature
                            </VuiTypography>
                        </VuiBox>
                    </Stack>
                    <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant='determinate'
                            value={100}
                            size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
                            color='success'
                        />
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
                            <VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <VuiTypography color='text' variant='button' mb='4px'>
                                    Temp
                                </VuiTypography>
                                <VuiTypography
                                    color='white'
                                    variant='d5'
                                    fontWeight='bold'
                                    mb='4px'
                                    sx={({ breakpoints }) => ({
                                        [breakpoints.only('xl')]: {
                                            fontSize: '32px'
                                        }
                                    })}>
                                    {!isLoading ? (
                                        data
                                    ) : (
                                        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                                            Loading...
                                        </VuiTypography>
                                    )}
                                </VuiTypography>
                            </VuiBox>
                        </VuiBox>
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </Card>
    );
}

export default ReferralTracking;
