import Grid from '@mui/material/Grid'

import WelcomeCard from '@views/mahasiswa/dashboard/WelcomeCard'
import ProgressTable from '@views/mahasiswa/dashboard/ProgressTable'
import CardDosen from '@/views/mahasiswa/dashboard/DosenCards'


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
    progress: 'Penasehat Akademik',
    status: 'aktif',
    url: '/mahasiswa/penasehat-akademik'
  },
  {
    id: 2,
    completedTasks: 2,
    totalTasks: 10,
    logo: 'tabler-flask',
    color: 'warning',
    progress: 'Praktikum/Laboratorium',
    status: 'aktif',
    url: '/mahasiswa/laboratorium'
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

const dataDosenProdi = [
  { name: "TITIN WAHYUNI", profession: "Dosen Prodi", id: "0903058406", avatar: "https://simak.unismuh.ac.id/upload/dosen/0903058406_.jpg" },
  { name: "RIZKI YUSLIANA BAKTI", profession: "Dosen Prodi", id: "0905078907", avatar: "https://simak.unismuh.ac.id/upload/dosen/0905078907_.jpg" },
  { name: "LUKMAN ANAS", profession: "Dosen Prodi", id: "0917109102", avatar: "https://simak.unismuh.ac.id/upload/dosen/0917109102_.jpg" },
  { name: "ASYRAFUL INSAN ASRY", profession: "Dosen Prodi", id: "0918068804", avatar: "https://simak.unismuh.ac.id/upload/dosen/0918068804_.jpg" },
  { name: "MUHYIDDIN A M HAYAT", profession: "Dosen Prodi", id: "0931087901", avatar: "https://simak.unismuh.ac.id/upload/dosen/0931087901_.jpg" },
  { name: "NANDY RIZALDY NAJIB", profession: "Dosen Prodi", id: "0031019003", avatar: "https://simak.unismuh.ac.id/upload/dosen/0031019003_.jpg" },
  { name: "AHMAD THARIQ", profession: "Dosen Prodi", id: "0028069104", avatar: "https://simak.unismuh.ac.id/upload/dosen/0028069104_.jpg" },
  { name: "CHYQUITHA DANUPUTRI", profession: "Dosen Prodi", id: "0431037702", avatar: "https://simak.unismuh.ac.id/upload/dosen/0431037702_.jpg" },
  { name: "LUKMAN", profession: "Dosen Prodi", id: "0921098306", avatar: "https://simak.unismuh.ac.id/upload/dosen/0921098306_.jpg" },
];

const dataPembimbingUjian = [
  { name: "Bentlee Emblin", profession: "Digital Marketing", id: "0905078908", avatar: "/images/avatars/2.png" },
];

const dataPembimbingKKP = [
  { name: "Beverlie Krabbe", profession: "Vue", id: "0905078909", avatar: "/images/avatars/4.png" },
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
      <Grid item xs={12} sm={6} md={4}>
        <CardDosen
          dataDosenProdi={dataDosenProdi}
          dataPembimbingKKP={dataPembimbingKKP}
          dataPembimbingUjian={dataPembimbingUjian}
        />
      </Grid>
    </Grid>
  )
}

export default Dashhboard
