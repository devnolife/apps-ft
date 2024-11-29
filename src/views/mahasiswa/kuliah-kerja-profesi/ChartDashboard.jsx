'use client';
import { Card, CardContent, Grid, Typography, Button, Box, Chip, CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import ReactApexChart from 'react-apexcharts';


const HeaderDashboard = ({ locationData, dataDosenPembimbing, daysElapsed }) => {
  const progressPercentage = Math.min((daysElapsed / 60) * 100, 100);

  const series = [progressPercentage];

  const options = {
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '65%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 5,
            fontSize: '30px',
            fontWeight: 'bold',
            formatter: function (val) {
              return `${Math.round(val)}%`;
            },
          },
        },
        track: {
          background: '#e7e7e7',
          strokeWidth: '100%',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#00b09b', '#96c93d'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 150,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '20px',
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 120,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                value: {
                  fontSize: '16px',
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Grid container spacing={2} alignItems='stretch'>
      <Grid item xs={12} md={4}>
        {dataDosenPembimbing ? (
          <Card
            sx={{
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Grid container alignItems='center' justifyContent='center'>
              <Grid item xs={8}>
                <CardContent>
                  <Typography
                    variant='body1'
                    className='mbe-2'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      maxHeight: '2.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {dataDosenPembimbing.name}
                  </Typography>
                  <Chip
                    label='Pembimbing Kuliah Kerja Praktek'
                    color='success'
                    size='small'
                    variant='tonal'
                    className='mbe-2'
                  />
                  <Typography
                    variant='subtitle1'
                    className='mbe-2'
                    sx={{
                      maxHeight: '2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {dataDosenPembimbing.profession}
                  </Typography>
                  <Typography variant='subtitle1' className='mbe-2'>
                    NIDN: {dataDosenPembimbing.nidn}
                  </Typography>
                  <Button variant='contained' color='primary'>
                    Lihat Profil
                  </Button>
                </CardContent>
              </Grid>
              <Grid item xs={4} display='flex' justifyContent='center'>
                <Avatar
                  alt={`Profil ${dataDosenPembimbing.name}`}
                  src={dataDosenPembimbing.avatar}
                  sx={{
                    width: 140,
                    height: 140,
                    border: '2px solid #3f51b5',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card
            sx={{
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Pembimbing Sedang Ditentukan
              </Typography>
              <Grid item xs={12} className='flex justify-center'>
                <img src='/gif/pencarian.gif' alt='Loading...' width={105} />
              </Grid>
              <Typography variant='body2' color='textSecondary'>
                Pembimbing Anda sedang dibuat. Silakan cek kembali nanti untuk melihat informasi pembimbing.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
      <Grid item xs={12} md={5}>
        <Card
          sx={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Grid container>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant='h5' className='mbe-1'>
                  {locationData.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' className='mbe-1'>
                  {locationData.address}
                </Typography>
                <Typography
                  color='text.secondary'
                  sx={{
                    maxHeight: 70,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {locationData.keterangan}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, marginTop: 5 }}>
                  <Button variant='outlined'>Lokasi</Button>
                  <Button variant='outlined'>Detail</Button>
                </Box>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={4} className='flex items-center justify-center'>
              <CardContent className='flex items-center justify-center' sx={{ paddingLeft: 2 }}>
                <img
                  src={locationData.logo}
                  height='120'
                  style={{
                    maxHeight: '120px',
                    objectFit: 'contain',
                  }}
                  className='rounded'
                  alt={`Logo ${locationData.name}`}
                />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          sx={{
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <CardContent className='flex flex-col items-center gap-3'>
            <Typography variant='h6'>
              Hari ke-{daysElapsed} dari 60
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 300 }}>
              {daysElapsed ? (
                <ReactApexChart
                  options={options}
                  series={series}
                  type='radialBar'
                  height='100%'
                />
              ) : (
                <CircularProgress size={10} thickness={2} />
              )}
            </Box>
            <Typography variant='body2' sx={{ marginTop: 2 }}>
              {daysElapsed} dari 60 hari KKP
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HeaderDashboard;

