

import { Nanum_Pen_Script } from "next/font/google";

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
    nama: 'SONY ACHMAD DJALIL',
    nim: '105841105321',
    prodi: 'Informatika',
    posisi: 'Anggota Kelompok',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841105321.jpg',
  }, {
    nama: 'DHIA DHAIFULLAH',
    nim: '105841108621',
    prodi: 'Informatika',
    posisi: 'Anggota Kelompok',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841108621.jpg',
  },
  {
    nama: 'MUH. AL IQRAM MARZAH ',
    nim: '105841105121',
    prodi: 'Informatika',
    posisi: 'Anggota Kelompok',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841105121.jpg',
  }
];

const aktivitasKelompok = [
  {
    date: '2024-11-01',
    time: '10:00 AM',
    location: 'Halaman Depan KPU',
    description: 'Penerimaan Berkas Surat KPP ',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    name: 'Andi Akbar DB',
    image: '/images/aktivitas.jpg',
  },
  {
    date: '2024-11-02',
    time: '12:00 AM',
    location: 'Base Area KPU',
    description: 'Lagi Membicarakan Masa Depan tentang Caleg Sinjai',
    name: 'DHIA DHAIFULLAH',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841108621.jpg',
    image: '/images/aktivitas2.jpg',
  },
  {
    date: '2024-11-02',
    time: '09:00 AM',
    location: 'Ruangan Rapat Umum KPU',
    description: 'Capek Bekerja Keras tapi tetap semangat gan dan kami akan selalu berjuang meskipun lelah karena kami adalah anak muda yang penuh semangat',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841105121.jpg',
    name: 'SONY ACHMAD DJALIL',
    image: '/images/aktivitas3.jpg',
  },
  {
    date: '2024-11-03',
    time: '09:00 AM',
    location: 'Ruangan Menyusui KPU',
    description: 'Sedang Belajar Menyusui dan Mengasuh Anak Kecil ',
    name: 'Andi Muhammad Akbar DB',
    avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    image: '/images/aktivitas4.jpg',
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
        <FormKegiatan activitiesData={aktivitasKelompok} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ActivityTimeline
          data={mahasiswa}
          dataDosenPembimbing={dataDosenPembimbing} />
      </Grid>
    </Grid>
  )
}

export default Page
