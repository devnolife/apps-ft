import Grid from '@mui/material/Grid'

import WelcomeCard from '@views/mahasiswa/dashboard/WelcomeCard'
import ProgressTable from '@views/mahasiswa/dashboard/ProgressTable'


const dataWelcome = {
  mahasiswa: {
    nama: 'Sitti Badriah',
    semester: 'Semester 5',
    sks: '90 SKS',
    ipk: '3.75'
  },
  dosen: {
    nama: 'MUHYIDDIN A M HAYAT',
    jabatan: 'Penasehat Akademik',
    avatar: 'https://simak.unismuh.ac.id/upload/dosen/0931087901_.jpg'
  }
}

const dataProgress = [
  {
    id: 1,
    completedTasks: 2,
    totalTasks: 7,
    logo: 'tabler-clipboard',
    color: 'success',
    progress: 'Kartu Kontrol PA',
    status: 'aktif',
    url: '/mahasiswa/kontrol-pa'
  },
  {
    id: 2,
    completedTasks: 2,
    totalTasks: 10,
    logo: 'tabler-flask',
    color: 'warning',
    progress: 'Praktikum/Laboratorium',
    status: 'aktif',
    url: '/mahasiswa/lab'
  },
  {
    id: 3,
    completedTasks: 1,
    totalTasks: 6,
    logo: 'tabler-file-check',
    color: 'info',
    progress: 'Kuliah Kerja Profesi',
    status: 'aktif',
    url: '/mahasiswa/kkp'
  },
  {
    id: 4,
    completedTasks: 0,
    totalTasks: 10,
    logo: 'tabler-pencil',
    color: 'success',
    progress: 'Proposal',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-proposal'
  },
  {
    id: 5,
    completedTasks: 0,
    totalTasks: 4,
    logo: 'tabler-medal',
    color: 'primary',
    progress: 'Ujian Hasil',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-hasil'
  },
  {
    id: 6,
    completedTasks: 0,
    totalTasks: 25,
    logo: 'tabler-graduation-cap',
    color: 'info',
    progress: 'Ujian Tutup',
    status: 'nonaktif',
    url: '/mahasiswa/ujian-tutup'
  },
]


const Dashhboard = async () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <WelcomeCard data={dataWelcome} />
      </Grid>
      < Grid item xs={12} md={8} >
        <ProgressTable dataProgress={dataProgress} />
      </Grid>
    </Grid>
  )
}

export default Dashhboard
