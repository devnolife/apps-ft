import React from 'react'

import { Modal, Box, Typography, Grid, Button, IconButton, Divider, Chip } from '@mui/material'

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

  const iconStyle = {
    verticalAlign: 'middle',
    marginRight: '8px'
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='view-surat-title'
      aria-describedby='view-surat-description'
    >
      <Box sx={style}>
        <Grid container justifyContent='flex-end' alignItems='center' mb={3}>
          <IconButton onClick={handleClose}>
            <i className='text-[20px] tabler-x' />
          </IconButton>
        </Grid>

        <Grid container spacing={2} direction='column' alignItems='center'>
          <Grid item>
            <CustomAvatar src={avatar} size={100} />
          </Grid>
          <Grid item>
            <Divider><Chip label="Detail Surat" /></Divider>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Typography variant='body1'>
              <i className='tabler-file-text' style={iconStyle} /> <strong>Nomor Surat:</strong> {nomorSurat}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-heading' style={iconStyle} /> <strong>Judul Surat:</strong> {judulSurat}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-tag' style={iconStyle} /> <strong>Jenis Surat:</strong> {jenisSurat}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-user' style={iconStyle} /> <strong>Penerima:</strong> {penerima}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-phone' style={iconStyle} /> <strong>Kontak:</strong> {kontak}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-mail' style={iconStyle} /> <strong>Email:</strong> {email}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-info-circle' style={iconStyle} /> <strong>Status Surat:</strong> {statusSurat}
            </Typography>
            <Typography variant='body1'>
              <i className='tabler-package' style={iconStyle} /> <strong>Metode Pengambilan:</strong> {metodePengambilan}
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
