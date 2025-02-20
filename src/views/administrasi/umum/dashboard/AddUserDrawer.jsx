// ...existing imports...
import { useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

const AddUserDrawer = props => {
  // Renamed props: suratData -> userData
  const { open, handleClose, userData, setData } = props

  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nomorSurat: '',
      judulSurat: '',
      jenisSurat: '',
      penerima: '',
      kontak: '',
      statusSurat: '',
      metodePengambilan: ''
    }
  })

  const onSubmit = data => {
    const newSurat = {
      id: (userData?.length && userData?.length + 1) || 1,
      ...data,
      avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`
    }

    setData([...(userData ?? []), newSurat])
    handleClose()
    resetForm()
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Tambah Surat Baru</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='text-2xl tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* ...existing Controller components... */}
          <Controller
            name='nomorSurat'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Nomor Surat'
                placeholder='Nomor Surat'
                {...(errors.nomorSurat && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='judulSurat'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Judul Surat'
                placeholder='Judul Surat'
                {...(errors.judulSurat && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='jenisSurat'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Jenis Surat'
                placeholder='Jenis Surat'
                {...(errors.jenisSurat && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='penerima'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Penerima'
                placeholder='Penerima'
                {...(errors.penerima && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='kontak'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Kontak'
                type='number'
                placeholder='Kontak'
                {...(errors.kontak && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='statusSurat'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status Surat'
                {...field}
                {...(errors.statusSurat && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='Diproses'>Diproses</MenuItem>
                <MenuItem value='Menunggu persetujuan'>Menunggu persetujuan</MenuItem>
                <MenuItem value='Disetujui'>Disetujui</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='metodePengambilan'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Metode Pengambilan'
                placeholder='Metode Pengambilan'
                {...(errors.metodePengambilan && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
