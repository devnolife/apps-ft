'use client'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import Chip from '@mui/material/Chip'

import CustomAvatar from '@core/components/mui/Avatar'


const icons = [
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38' fill='none'>
        <path
          opacity='0.2'
          d='M5.9375 26.125V10.6875C5.9375 10.0576 6.18772 9.45352 6.63312 9.00812C7.07852 8.56272 7.68261 8.3125 8.3125 8.3125H29.6875C30.3174 8.3125 30.9215 8.56272 31.3669 9.00812C31.8123 9.45352 32.0625 10.0576 32.0625 10.6875V26.125H5.9375Z'
          fill='currentColor'
        />
        <path
          d='M5.9375 26.125V10.6875C5.9375 10.0576 6.18772 9.45352 6.63312 9.00812C7.07852 8.56272 7.68261 8.3125 8.3125 8.3125H29.6875C30.3174 8.3125 30.9215 8.56272 31.3669 9.00812C31.8123 9.45352 32.0625 10.0576 32.0625 10.6875V26.125M21.375 13.0625H16.625M3.5625 26.125H34.4375V28.5C34.4375 29.1299 34.1873 29.734 33.7419 30.1794C33.2965 30.6248 32.6924 30.875 32.0625 30.875H5.9375C5.30761 30.875 4.70352 30.6248 4.25812 30.1794C3.81272 29.734 3.5625 29.1299 3.5625 28.5V26.125Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    title: 'Semester Saat Ini',
    color: 'primary'
  },
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38' fill='none'>
        <path
          opacity='0.2'
          d='M11.682 24.7885C10.2683 23.6892 9.1233 22.2826 8.33376 20.6753C7.54423 19.0679 7.13087 17.3019 7.125 15.5111C7.09532 9.06896 12.2758 3.71037 18.718 3.56193C21.2112 3.50283 23.6598 4.2302 25.7164 5.6409C27.7731 7.05159 29.3334 9.07399 30.176 11.4213C31.0187 13.7686 31.1009 16.3216 30.4111 18.7182C29.7213 21.1149 28.2944 23.2335 26.3328 24.7736C25.8995 25.1086 25.5485 25.5382 25.3067 26.0296C25.0648 26.521 24.9386 27.0611 24.9375 27.6088V28.4994C24.9375 28.8144 24.8124 29.1164 24.5897 29.3391C24.367 29.5618 24.0649 29.6869 23.75 29.6869H14.25C13.9351 29.6869 13.633 29.5618 13.4103 29.3391C13.1876 29.1164 13.0625 28.8144 13.0625 28.4994V27.6088C13.0588 27.0652 12.9328 26.5295 12.6938 26.0413C12.4548 25.553 12.109 25.1249 11.682 24.7885Z'
          fill='currentColor'
        />
      </svg>
    ),
    title: 'SKS Diselesaikan',
    color: 'info'
  },
  {
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='38' height='38' viewBox='0 0 38 38' fill='none'>
        <path
          opacity='0.2'
          d='M8.08984 29.9102C6.72422 28.5445 7.62969 25.6797 6.93203 24.0023C6.23438 22.325 3.5625 20.8555 3.5625 19C3.5625 17.1445 6.20469 15.7344 6.93203 13.9977C7.65938 12.2609 6.72422 9.45547 8.08984 8.08984C9.45547 6.72422 12.3203 7.62969 13.9977 6.93203C15.675 6.23438 17.1445 3.5625 19 3.5625C20.8555 3.5625 22.2656 6.20469 24.0023 6.93203C25.7391 7.65938 28.5445 6.72422 29.9102 8.08984C31.2758 9.45547 30.3703 12.3203 31.068 13.9977C31.7656 15.675 34.4375 17.1445 34.4375 19C34.4375 20.8555 31.7953 22.2656 31.068 24.0023C30.3406 25.7391 31.2758 28.5445 29.9102 29.9102C28.5445 31.2758 25.6797 30.3703 24.0023 31.068C22.325 31.7656 20.8555 34.4375 19 34.4375C17.1445 34.4375 15.7344 31.7953 13.9977 31.068C12.2609 30.3406 9.45547 31.2758 8.08984 29.9102Z'
          fill='currentColor'
        />
      </svg>
    ),
    title: 'IPK',
    color: 'warning'
  }
]

const WelcomeCard = ({ data }) => {
  const theme = useTheme()
  const belowMdScreen = useMediaQuery(theme.breakpoints.down('md'))


  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row md:items-center'>
      <div className='md:w-8/12'>
        <div className='flex flex-col items-baseline gap-1 mb-2 md:flex-row'>
          <Typography variant={belowMdScreen ? 'h6' : 'h5'} className='mb-3'>
            Selamat Datang,
          </Typography>
          <Typography variant={belowMdScreen ? 'h5' : 'h4'} className='mb-2'>
            {data.mahasiswa.nama} 👋🏻
          </Typography>
        </div>
        <Typography className='mb-3'>
          Progress Anda luar biasa! Tetap rajin kuliah dan belajar agar lulus tepat waktu!
        </Typography>
        <div className='flex flex-wrap justify-between gap-4'>
          {icons.map((item, i) => (
            <div key={i} className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' size={belowMdScreen ? 48 : 54} color={item.color}>
                {item.icon}
              </CustomAvatar>
              <div>
                <Typography className='font-medium'>{item.title}</Typography>
                <Typography variant='h6' color={`${item.color}.main`} className='mt-0 mb-0'>
                  {i === 0
                    ? data.mahasiswa.semester
                    : i === 1
                      ? data.mahasiswa.sks
                      : data.mahasiswa.ipk}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider orientation={belowMdScreen ? 'horizontal' : 'vertical'} flexItem className='mt-4 md:mt-0 md:ml-7' />
      <div className='flex flex-col justify-between py-4 md:w-4/12'>
        <div className='flex flex-col items-center gap-2'>
          <CustomAvatar
            alt='user-profile'
            src={data.dosen.avatar}
            variant='rounded'
            size={belowMdScreen ? 120 : 140}
          />
          <Typography variant={belowMdScreen ? 'h6' : 'h5'} className='mt-0 mb-0'>
            {data.dosen.nama}
          </Typography>
          <Chip label={data.dosen.jabatan} color='success' size='small' variant='tonal' />
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard
