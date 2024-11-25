'use client'

import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

import './print.css'

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden'
}))


const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  '& th, & td': {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  '& th': {
    backgroundColor: theme.palette.background.default,
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Preview = ({ data, mahasiswa, signature }) => {
  const { tanggal, namaProdi, namaKetuaProdi, nbm } = signature;

  return (
    <div className='previewCard'>
      <StyledCard className="styled-card">
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className='p-6 rounded bg-actionHover'>
                <div className='flex items-center justify-between gap-y-4'>
                  <Avatar src='/logo/logo-ft.png' alt='logo' sx={{ width: 120, height: 120 }} />
                  <div className='flex flex-col items-center text-center'>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                      UNIVERSITAS MUHAMMADIYAH MAKASSAR
                    </Typography>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                      PROGRAM STUDI INFORMATIKA
                    </Typography>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#365F91', fontFamily: 'Arial Black, sans-serif' }}>
                      FAKULTAS TEKNIK
                    </Typography>
                  </div>
                  <Avatar src='/logo/unggul.png' alt='logo' sx={{ width: 120, height: 120 }} />
                </div>
              </div>
            </Grid>

            <Grid item xs={12} container justifyContent="center" alignItems="center" direction="column" spacing={1}>
              <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem', textAlign: 'center', color: '#365F91' }}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </Typography>
              <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                KARTU KONTROL PENASEHAT AKADEMIK
              </Typography>
              <Typography variant='h5' sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                TAHUN AJARAN: {mahasiswa?.tahun_akademik}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div className='flex flex-col gap-2'>
                <div className='flex'>
                  <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                    Nama:
                  </Typography>
                  <Typography variant='body1' color='text.primary'>: {mahasiswa?.nama}</Typography>
                </div>
                <div className='flex'>
                  <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                    Nim/Stambuk
                  </Typography>
                  <Typography variant='body1' color='text.primary'>: {mahasiswa?.nim}</Typography>
                </div>
                <div className='flex'>
                  <Typography variant='body1' color='text.primary' sx={{ minWidth: '180px', fontWeight: 'bold' }}>
                    Penasehat Akademik
                  </Typography>
                  <Typography variant='body1' color='text.primary'>: {mahasiswa?.penasehat_akademik}</Typography>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className='overflow-x-auto border rounded'>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Hari/Tanggal</th>
                      <th>Uraian</th>
                      <th>Keterangan</th>
                      <th>Paraf</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.no}>
                        <td>{item.no}</td>
                        <td>{item.date}</td>
                        <td style={{ fontWeight: 'bold' }}>{item.uraian}</td>
                        <td>{item.keterangan}</td>
                        <td>
                          <Chip
                            label={item.paraf}
                            variant='tonal'
                            size='small'
                            color={item.paraf === 'Sudah' ? 'success' : 'warning'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Catatan:</strong> Sebelum Tanda Tangan Ketua Prodi, Mahasiswa diwajibkan:
              </Typography>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <li>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Konsultasi ke Penasehat Akademik setiap Bulan Semester Berjalan (Min. 5 kali)
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Pengurusan Tanda Tangan dan Cetak KRS Online pada Awal Semester Berjalan (1 Bulan awal Semester)
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Pengisian Uraian Kartu Kontrol diisi oleh Mahasiswa pada saat Konsultasi di Depan PA yang ditandai dengan Paraf PA
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Point 1, 2, dan 3 wajib dipenuhi sebagai Syarat Pengambilan Kartu UAS Semester Berjalan
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}
            className="signature-section">
            <Typography>Makassar, {tanggal}</Typography>
            <Typography>Ketua Prodi {namaProdi}</Typography>
            <Typography>&nbsp;</Typography>
            <Typography>&nbsp;</Typography>
            <Typography>&nbsp;</Typography>
            <Typography>{namaKetuaProdi}</Typography>
            <Typography>NBM: {nbm}</Typography>
          </Grid>
        </CardContent>
        <div
          style={{
            borderTop: '4px solid #365F91',
            padding: '10px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: '20px', paddingLeft: '20px' }}>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Gedung Menara Iqra Lantai 3<br />
                Jl. Sultan Alauddin No. 259 Telp. (0411) 866 972 Fax (0411) 865 588 Makassar 90221<br />
                Web: <a href="https://if.unismuh.ac.id/" target="_blank" rel="noopener noreferrer">https://if.unismuh.ac.id/</a>,
                e-mail: <a href="mailto:if@unismuh.ac.id">if@unismuh.ac.id</a>
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="/logo/iso.png"
                alt="TUV Logo"
                style={{ width: '150px', height: 'auto' }}
              />
              <img
                src="/logo/merdeka.png"
                alt="Kampus Merdeka Logo"
                style={{ width: '120px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </StyledCard>
    </div>
  )
}

export default Preview
