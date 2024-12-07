'use client'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const ConfirmationPages = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex flex-col items-center gap-4 text-center'>
          <Typography variant='h4'>Permohonan Surat KKP Anda Telah Diproses</Typography>
          <Typography>
            Permintaan <span className='font-medium text-textPrimary'>#{data.requestId}</span> sedang diperiksa oleh prodi!
          </Typography>
          <Typography>{data.prodiCheckMessage}</Typography>
          <Typography>{data.whatsappNote}</Typography>
          <div className='flex items-center'>
            <i className='text-xl tabler-clock' />
            <Typography>Dikirim pada: 25/05/2023 13:35pm</Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} className='flex'>
        <div className='flex flex-col items-center w-full border rounded md:flex-row md:items-start'>
          <div className='flex flex-col items-center w-full p-6 md:w-auto'>
            <div className='flex flex-col items-center gap-4 mbe-4'>
              <img src={data.instansi.logo} alt={data.instansi.name} width={140} />
            </div>
            <div>
              <Typography color='text.primary' variant="h6" sx={{ fontWeight: 'bold' }}>
                {data.instansi.name}
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {data.instansi.address}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
                {data.instansi.keterangan}
              </Typography>
            </div>
          </div>
          <div className='flex flex-col items-center w-full p-6 md:w-auto'>
            <div className='flex items-center gap-2 mbe-4'>
              <i className='text-xl tabler-users text-textPrimary' />
              <Typography color='text.primary' className='font-medium'>
                Mahasiswa Yang Terdaftar
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              {data.mahasiswa.map((student, index) => (
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
      <Grid item xs={12} className='flex justify-center'>
        <Button variant="contained" color="info">
          Kembali
        </Button>
      </Grid>
    </Grid>
  )
};

export default ConfirmationPages;
