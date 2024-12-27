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
    penerima: 'Arief Kurniawan',
    negara: 'Indonesia',
    kontak: '(479) 232-9151',
    email: 'arief.kurniawan@abc.net.au',
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
    penerima: 'Nur Azizah',
    negara: 'Indonesia',
    kontak: '(472) 607-9137',
    email: 'nur.azizah@imgur.com',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 3,
    nomorSurat: '003/Lulus/2024',
    judulSurat: 'Surat Keterangan Lulus',
    jenisSurat: 'Keterangan',
    penerima: 'Dwi Santoso',
    negara: 'Indonesia',
    kontak: '(321) 264-4599',
    email: 'dwi.santoso@who.int',
    statusSurat: 'Disetujui',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 4,
    nomorSurat: '004/SKP/2024',
    judulSurat: 'Pengajuan SKP',
    jenisSurat: 'Pengajuan',
    penerima: 'Cyrill Risby',
    negara: 'Indonesia',
    kontak: '(923) 690-6806',
    email: 'cyrill.risby@wordpress.com',
    statusSurat: 'Pengajuan',
    avatar: '/images/avatars/3.png',
    metodePengambilan: 'Dikirim via email'
  },
  {
    id: 5,
    nomorSurat: '005/KKP/2024',
    judulSurat: 'Surat Pengantar KKP',
    jenisSurat: 'Pengantar',
    penerima: 'Maggy Hurran',
    negara: 'Indonesia',
    kontak: '(669) 914-1078',
    email: 'maggy.hurran@yahoo.co.jp',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/1.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 6,
    nomorSurat: '006/Beasiswa/2024',
    judulSurat: 'Pengajuan Beasiswa',
    jenisSurat: 'Pengajuan',
    penerima: 'Silvain Halstead',
    negara: 'Indonesia',
    kontak: '(958) 973-3093',
    email: 'silvain.halstead@shinystat.com',
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
    penerima: 'Breena Gallemore',
    negara: 'Indonesia',
    kontak: '(825) 977-8152',
    email: 'breena.gallemore@boston.com',
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
    penerima: 'Kathryne Liger',
    negara: 'Indonesia',
    kontak: '(187) 440-0934',
    email: 'kathryne.liger@vinaora.com',
    statusSurat: 'Diproses',
    avatar: '/images/avatars/4.png',
    metodePengambilan: 'Diambil langsung'
  },
  {
    id: 9,
    nomorSurat: '009/SKP/2024',
    judulSurat: 'Surat Pengantar SKP',
    jenisSurat: 'Pengantar',
    penerima: 'Franz Scotfurth',
    negara: 'Indonesia',
    kontak: '(978) 146-5443',
    email: 'franz.scotfurth@dailymotion.com',
    statusSurat: 'Menunggu persetujuan',
    avatar: '/images/avatars/2.png',
    metodePengambilan: 'Dikirim via email'
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
