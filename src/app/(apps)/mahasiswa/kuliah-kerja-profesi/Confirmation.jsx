import { Grid } from "@mui/material";

import ConfirmationPages from "@/views/mahasiswa/kuliah-kerja-profesi/Confirmation";

const locationData = {
  name: 'Warkop Kopi Kenangan',
  address: 'Jl. Boulevard No.1, Makassar',
  logo: '/logo/kopkep.png',
  keterangan: 'Warkop Kopi Kenangan adalah warkop yang berada di Makassar yang menyediakan berbagai macam minuman kopi.',
};

const fakeData = {
  requestId: 'KKP2023111101',
  prodiCheckMessage: 'Request sedang diperiksa oleh prodi, hasil akan dikirim ke WhatsApp Ketua.',
  whatsappNote: 'Pastikan WhatsApp ketua kelompok selalu ON untuk menerima informasi penting.',
  instansi: locationData,
  mahasiswa: [
    {
      nama: 'Andi Muhammad Akbar DB Posgre',
      nim: '105841111221',
      prodi: 'Informatika',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111221.jpg',
    },
    {
      nama: 'RIZKA UTAMA',
      nim: '105841111421',
      prodi: 'Informatika',
      avatar: 'https://simak.unismuh.ac.id/upload/mahasiswa/105841111421.jpg',
    },
  ],
  activities: [
    {
      title: 'Pembentukan Kelompok',
      date: '2023-11-01',
      description: 'Kelompok KKP telah dibentuk oleh mahasiswa.',
      color: 'primary',
    },
    {
      title: 'Persetujuan Lokasi KKP',
      date: '2023-11-05',
      description: 'Tempat lokasi KKP telah disetujui oleh Ketua Prodi.',
      color: 'success',
    },
  ],
};


const Confirmation = () => {
  return (
    <Grid>
      <ConfirmationPages data={fakeData} />
    </Grid>
  )
}

export default Confirmation
