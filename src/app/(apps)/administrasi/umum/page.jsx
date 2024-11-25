import Grid from '@mui/material/Grid'

import CardWelcome from '@/views/administrasi/umum/dashboard/CardWelcome'
import StatisticSurat from '@/views/administrasi/umum/dashboard/StatisticCard'

const jumlahSurat = 10

const data = [
  {
    stats: '230',
    title: 'Surat Masuk',
    color: 'primary',
    icon: 'tabler-mail'
  },
  {
    color: 'info',
    stats: '150',
    title: 'Surat Keluar',
    icon: 'tabler-send'
  },
  {
    color: 'error',
    stats: '75',
    title: 'Dokumen Arsip',
    icon: 'tabler-archive'
  },
  {
    stats: '455',
    color: 'success',
    title: 'Total Dokumen',
    icon: 'tabler-file'
  }
]

const DashboardUmum = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <CardWelcome jumlahSurat={jumlahSurat} />
      </Grid>
      <Grid item xs={12} md={8}>
        <StatisticSurat dataSurat={data} />
      </Grid>
    </Grid>
  )
}

export default DashboardUmum
