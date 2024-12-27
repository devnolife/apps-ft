'use client'

import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'

import StepLocation from "@views/mahasiswa/kuliah-kerja-profesi/StepLocation";
import StepMembers from "@views/mahasiswa/kuliah-kerja-profesi/StepMembers";
import StepConfirmation from "@views/mahasiswa/kuliah-kerja-profesi/StepConfirmation";

import StepperWrapper from '@core/styles/stepper'


const dataLokasiKkp = [
  {
    name: 'Komisi Pemilihan Umum - Kota Makassar',
    address: 'Jl. Perintis Kemerdekaan No.3, Makassar',
    logo: '/logo/kpu.png',
    keterangan: 'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
  },
  {
    name: 'Kalla Group',
    address: 'Jl. AP Pettarani No.1, Makassar',
    logo: '/logo/kalla.png',
    keterangan: 'Kalla Group adalah sebuah perusahaan yang bergerak di bidang konstruksi, properti, hotel, dan lain-lain.',
  },
  {
    name: 'PDAM Kota Makassar',
    address: 'Jl. Dr. Sam Ratulangi No.52, Makassar',
    logo: '/logo/pdam.png',
    keterangan: 'PDAM Kota Makassar adalah perusahaan daerah yang bergerak di bidang penyediaan air bersih di Kota Makassar.',
  },
  {
    name: 'Balai Bahasa Sulawesi Selatan',
    address: 'Jl. Sultan Alauddin No.259, Makassar',
    logo: '/logo/balai.png',
    keterangan: 'Balai Bahasa Sulawesi Selatan adalah balai bahasa yang berada di Sulawesi Selatan.',
  },
  {
    name: 'TVRI Sulawesi Selatan',
    address: 'Jl. Pajonga Daeng Ngalle No.28, Makassar',
    logo: '/logo/tvri.png',
    keterangan: 'TVRI Sulawesi Selatan adalah stasiun televisi yang berada di Sulawesi Selatan yang merupakan bagian dari TVRI.',
  },
  {
    name: 'Warkop Kopi Kenangan',
    address: 'Jl. Boulevard No.1, Makassar',
    logo: '/logo/kopkep.png',
    keterangan: 'Warkop Kopi Kenangan adalah warkop yang berada di Makassar yang menyediakan berbagai macam minuman kopi.',
  },
];

const getStepContent = (step, handleNext, initialConfirmed) => {
  switch (step) {
    case 0:
      return <StepLocation handleNext={handleNext} data={dataLokasiKkp} />
    case 1:
      return <StepMembers handleNext={handleNext} />
    case 2:
      return <StepConfirmation />
    default:
      return null
  }
}

const steps = [
  {
    title: 'Pilih Lokasi',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
      </svg>
    )
  },
  {
    title: 'Pilih Anggota',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    )
  },
  {
    title: 'Konfirmasi',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-1 17.93V19h2v-1.07c-1.17-.11-2.34-.34-3.5-.68-.33-.1-.5-.45-.5-.79v-1.72c0-.34.17-.69.5-.79 1.16-.34 2.33-.57 3.5-.68V11h-2v-1h2V8.07c1.17.11 2.34.34 3.5.68.33.1.5.45.5.79v1.72c0 .34-.17.69-.5.79-1.16.34-2.33.57-3.5.68V13h2v1h-2v1.93z" />
      </svg>
    )
  }
]

const Stepper = styled(MuiStepper)(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '& + i': {
      display: 'none',
      color: 'var(--mui-palette-text-secondary) !important'
    },
    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      paddingBlock: theme.spacing(5),
      svg: {
        marginInline: theme.spacing(1.5),
        fill: 'var(--mui-palette-text-primary)'
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiTypography-root': {
          color: 'var(--mui-palette-primary-main)'
        },
        '& svg': {
          fill: 'var(--mui-palette-primary-main)'
        }
      }
    },
    '&.Mui-completed + i': {
      color: 'var(--mui-palette-primary-main) !important'
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}))



const Pendaftaran = () => {
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
          >
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel icon={<></>} className='text-center' style={{ pointerEvents: 'none' }}>
                    {step.icon}
                    <Typography className='step-title'>{step.title}</Typography>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider />
      <CardContent>{getStepContent(activeStep, handleNext)}</CardContent>
    </Card>
  )
}


export default Pendaftaran
