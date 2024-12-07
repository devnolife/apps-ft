'use client'
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Confetti from 'react-confetti';

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
  ]
};

const StepConfirmation = ({ handleNext }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setConfirmed(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Confetti duration 2 seconds
    }, 2000); // Simulate loading time
  };

  const handleCancel = () => {
    setConfirmed(false);
    setLoading(false);
  };

  return (
    <Grid container spacing={6}>
      {loading && (
        <Grid item xs={12} className='flex justify-center'>
          <img src="/gif/loading.gif" alt="Loading..." width={400} />
        </Grid>
      )}
      {!loading && (
        <>
          {showConfetti && <Confetti />}
          <Grid item xs={12}>
            <div className='flex flex-col items-center gap-4 text-center'>
              <Typography variant='h4'>Terima Kasih! 😇</Typography>
              <Typography>
                Permintaan <span className='font-medium text-textPrimary'>#{fakeData.requestId}</span> sedang diperiksa oleh prodi!
              </Typography>
              <Typography>{fakeData.prodiCheckMessage}</Typography>
              <Typography>{fakeData.whatsappNote}</Typography>
              <div className='flex items-center'>
                <i className='text-xl tabler-clock' />
                <Typography>Dikirim pada: 25/05/2023 13:35pm</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='flex flex-col border rounded md:flex-row'>
              <div className='flex flex-col items-center p-6 is-full sm:items-start'>
                <div className='flex flex-col items-center gap-4 mbe-4'>
                  <img src={fakeData.instansi.logo} alt={fakeData.instansi.name} width={140} />
                </div>
                <div>
                  <Typography color='text.primary' variant="h6" sx={{ fontWeight: 'bold' }}>
                    {fakeData.instansi.name}
                  </Typography>
                  <Typography variant='body1' color='text.primary'>
                    {fakeData.instansi.address}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
                    {fakeData.instansi.keterangan}
                  </Typography>
                </div>
              </div>
              <div className='flex flex-col items-center p-6 is-full sm:items-start'>
                <div className='flex items-center gap-2 mbe-4'>
                  <i className='text-xl tabler-users text-textPrimary' />
                  <Typography color='text.primary' className='font-medium'>
                    Mahasiswa Yang Terdaftar
                  </Typography>
                </div>
                <div className='flex flex-col gap-4'>
                  {fakeData.mahasiswa.map((student, index) => (
                    <div key={index} className='flex items-center gap-4'>
                      <Avatar src={student.avatar} alt={student.nama} sx={{ width: 50, height: 50 }} />
                      <div>
                        <Typography>{student.nama}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {student.nim} - {student.prodi}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
          {!confirmed && (
            <Grid item xs={12} className='flex justify-end gap-4'>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Batalkan
              </Button>
              <Button variant="contained" color="primary" onClick={handleConfirm}>
                Konfirmasi
              </Button>
            </Grid>
          )}
        </>
      )
      }
    </Grid >
  );
};

export default StepConfirmation;
