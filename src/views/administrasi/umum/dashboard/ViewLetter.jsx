import React from 'react'

import { Modal, Box, Typography, Grid, Button, IconButton } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'

const ViewLetter = ({ open, handleClose, suratData }) => {
  const { nomorSurat, judulSurat, jenisSurat, penerima, kontak, email, statusSurat, metodePengambilan, avatar } =
    suratData || {}

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='view-surat-title'
      aria-describedby='view-surat-description'
    >
      <Box sx={style}>
        <Grid container justifyContent='space-between' alignItems='center' mb={3}>
          <Typography id='view-surat-title' variant='h6' component='h2'>
            Detail Surat
          </Typography>
          <IconButton onClick={handleClose}>
            <i className='tabler-x' />
          </IconButton>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CustomAvatar src={avatar} size={70} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant='body1'>
              <strong>Nomor Surat:</strong> {nomorSurat}
            </Typography>
            <Typography variant='body1'>
              <strong>Judul Surat:</strong> {judulSurat}
            </Typography>
            <Typography variant='body1'>
              <strong>Jenis Surat:</strong> {jenisSurat}
            </Typography>
            <Typography variant='body1'>
              <strong>Penerima:</strong> {penerima}
            </Typography>
            <Typography variant='body1'>
              <strong>Kontak:</strong> {kontak}
            </Typography>
            <Typography variant='body1'>
              <strong>Email:</strong> {email}
            </Typography>
            <Typography variant='body1'>
              <strong>Status Surat:</strong> {statusSurat}
            </Typography>
            <Typography variant='body1'>
              <strong>Metode Pengambilan:</strong> {metodePengambilan}
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent='flex-end' mt={3}>
          <Button variant='contained' onClick={handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ViewLetter
