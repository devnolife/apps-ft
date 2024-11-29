

import { Grid } from "@mui/material";

import ChartDashboard from "@views/mahasiswa/kuliah-kerja-profesi/ChartDashboard";
import FormKegiatan from "@/views/mahasiswa/kuliah-kerja-profesi/FormKegiatan";
import ActivityTimeline from "@/views/mahasiswa/kuliah-kerja-profesi/ActivityTimeline";


const statusKpp = true

const locationData = {

  name: 'Komisi Pemilihan Umum - Kota Makassar',
  address: 'Jl. Perintis Kemerdekaan No.3, Makassar',
  logo: '/logo/kpu.png',
  keterangan:
    'Kantor KPU Kota Makassar adalah kantor yang berada di Kota Makassar yang bertugas untuk mengatur dan melaksanakan pemilihan umum di Kota Makassar.',
};

const daysElapsed = 45; // Example value

const dataDosenPembimbing = {
  name: "ASYRAFUL INSAN S.Kom.,M.T",
  profession: "Dosen Prodi Informatika",
  nidn: "0918068804",
  avatar: "https://simak.unismuh.ac.id/upload/dosen/0918068804_.jpg"
};


const mahasiswa = [
  {
    nama: 'Andi Muhammad Akbar DB',
    nim: '105841111221',
    prodi: 'Informatika',
    posisi: 'Ketua Kelompok',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
  },
  {
    nama: 'RIZKA UTAMI',
    nim: '105841111421',
    prodi: 'Informatika',
    posisi: 'Anggota Kelompok',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg',
  }
];


const Page = async () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{
        marginBottom: 1
      }}>
        <ChartDashboard dataDosenPembimbing={null} locationData={locationData} daysElapsed={daysElapsed}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <FormKegiatan />
      </Grid>
      <Grid item xs={12} md={4}>
        <ActivityTimeline data={mahasiswa} dataDosenPembimbing={dataDosenPembimbing} />
      </Grid>
    </Grid>
  )
}

export default Page
