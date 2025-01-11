import Grid from '@mui/material/Grid'

import CardWelcome from '@/views/administrasi/umum/dashboard/CardWelcome'
import StatisticSurat from '@/views/administrasi/umum/dashboard/StatisticCard'
import TableLetter from '@/views/administrasi/umum/dashboard/TableLetter'
import TimeLine from '@/views/administrasi/umum/dashboard/TimeLine'

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

const dataSurat = [
  {
    id: 1,
    nomorSurat: '001/KKP/2024',
    judulSurat: 'Pengajuan KKP',
    jenisSurat: 'Pengajuan',
    pengaju: 'Arief Kurniawan',
    nim: '4792329151',
    statusSurat: 'Diproses',
    avatar: '',
    avatarColor: 'primary',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 2,
    nomorSurat: '002/Beasiswa/2024',
    judulSurat: 'Rekomendasi Beasiswa',
    jenisSurat: 'Rekomendasi',
    pengaju: 'Nur Azizah',
    nim: '4726079137',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 3,
    nomorSurat: '003/Lulus/2024',
    judulSurat: 'Surat Keterangan Lulus',
    jenisSurat: 'Keterangan',
    pengaju: 'Dwi Santoso',
    nim: '3212644599',
    statusSurat: 'Disetujui',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 4,
    nomorSurat: '004/SKP/2024',
    judulSurat: 'Pengajuan SKP',
    jenisSurat: 'Pengajuan',
    pengaju: 'Cyrill Risby',
    nim: '9236906806',
    statusSurat: 'Pengajuan',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 5,
    nomorSurat: '005/KKP/2024',
    judulSurat: 'Surat Pengantar KKP',
    jenisSurat: 'Pengantar',
    pengaju: 'Maggy Hurran',
    nim: '6699141078',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 6,
    nomorSurat: '006/Beasiswa/2024',
    judulSurat: 'Pengajuan Beasiswa',
    jenisSurat: 'Pengajuan',
    pengaju: 'Silvain Halstead',
    nim: '9589733093',
    statusSurat: 'Diproses',
    avatar: '',
    avatarColor: 'error',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 7,
    nomorSurat: '007/Lulus/2024',
    judulSurat: 'Surat Keterangan Lulus',
    jenisSurat: 'Keterangan',
    pengaju: 'Breena Gallemore',
    nim: '8259778152',
    statusSurat: 'Disetujui',
    avatar: '',
    avatarColor: 'warning',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 8,
    nomorSurat: '008/Beasiswa/2024',
    judulSurat: 'Rekomendasi Beasiswa',
    jenisSurat: 'Rekomendasi',
    pengaju: 'Kathryne Liger',
    nim: '1874400934',
    statusSurat: 'Diproses',
    avatar: '/images/avatars/4.png',
    metodePengambilan: 'Diambil langsung'
  },
]


const DashboardUmum = () => {
  return (
    <Grid container spacing={4}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <CardWelcome jumlahSurat={jumlahSurat} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticSurat dataSurat={data} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableLetter db={dataSurat} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TimeLine />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardUmum
