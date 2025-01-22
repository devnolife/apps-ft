/* eslint-disable react/no-unescaped-entities */
'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { styled, useTheme } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'

const Timeline = styled(MuiTimeline)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root:nth-of-type(even) .MuiTimelineContent-root': {
    textAlign: 'left'
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTimelineItem-root': {
      width: '100%',
      '&:before': {
        display: 'none'
      }
    }
  },
  '& .MuiTimelineItem-root': {
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.5s ease forwards',
    animationDelay: 'calc(0.1s * var(--animation-index))'
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(5px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}))

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  '&:hover': {
    transform: 'translateY(-9px)',
    opacity: 1
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(1.5)
  },
  [theme.breakpoints.down('md')]: {
    opacity: 0.7
  }
}))

const Data = [
  {
    week: 'Minggu 1',
    title: 'Orientasi, Observasi, dan Pengenalan Lapangan',
    header: 'Pengenalan dan Orientasi Lapangan',
    icon: 'tabler-map-pin',
    chipColor: 'primary',
    waktu: 'Bulan 1'
  },
  {
    week: 'Minggu 2 - 7',
    title: 'Implementasi ilmu di bangku kuliah, Proses Penambahan Ilmu Lapangan, proses bersosialisasi, proses mencari dan memecahkan masalah, pengumpulan data, dan pembuatan laporan harian',
    header: 'Implementasi dan Pembelajaran Lapangan',
    icon: 'tabler-book',
    chipColor: 'secondary',
    waktu: 'Bulan 2'
  },
  {
    week: 'Minggu 8',
    title: 'Perampungan Kegiatan, Pembuatan Laporan pendahuluan, perampungan syarat administrasi',
    header: 'Penyelesaian Kegiatan dan Pembuatan Laporan',
    icon: 'tabler-file',
    chipColor: 'info',
    waktu: 'Bulan 3'
  },
  {
    week: 'Minggu 9',
    title: 'Obserfasi dan silaturrahmi dengan parsyarikatan yang ada di sekitar lokasi',
    header: 'Observasi dan Silaturrahmi dengan Masyarakat',
    icon: 'tabler-users',
    chipColor: 'warning',
    waktu: 'Bulan 4'
  },
  {
    week: 'Minggu 10 – 12',
    title: 'Pelaksanaan program pengabdian pada persyarikatan berdasarkan keilmuan atau sosial kemasarakatan, pembuatan laporan, perampungan syarat administratif',
    header: 'Pelaksanaan Program Pengabdian dan Laporan Akhir',
    icon: 'tabler-handshake',
    chipColor: 'error',
    waktu: 'Bulan 5-6'
  }
]


const TimelineKKP = () => {

  const theme = useTheme()
  const isBelowMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Timeline KKP</Typography>
        <Box sx={{ width: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <Timeline position={isBelowMdScreen ? 'right' : 'alternate'}>
            {Data.map((item, index) => (
              <TimelineItem key={index} style={{ '--animation-index': index }}>
                {!isBelowMdScreen && (
                  <TimelineOppositeContent>
                    <Typography variant='caption' component='div' className='mbs-5'>
                      {item.week}
                    </Typography>
                  </TimelineOppositeContent>
                )}
                <TimelineSeparator>
                  <TimelineDot color='primary' variant='tonal'>
                    <i className={`text-lg ${item.icon}`} />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {isBelowMdScreen && (
                    <Typography variant='caption' component='div' className='mbs-5'>
                      {item.week}
                    </Typography>
                  )}
                  <Fade in={true} timeout={500}>
                    <HoverCard>
                      <CardContent>
                        <Box
                          sx={{
                            padding: 1.5,
                            borderRadius: 1
                          }}
                        >
                          <Typography variant='h5' className='mbe-1'>
                            {item.header}
                          </Typography>
                          <Typography variant='body1' className='mbe-2 indented-title'>
                            {item.title}
                          </Typography>
                          <Chip label={item.waktu} color={item.chipColor} size="small" />
                        </Box>
                      </CardContent>
                    </HoverCard>
                  </Fade>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TimelineKKP
