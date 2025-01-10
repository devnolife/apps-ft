// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import useApiGraphql from '@hooks/useApiGraphql'

const initialData = {
  prodi_kode_prodi: '',
  nama: '',
  logo: '',
  url_check: '',
  response_should_be: '',
  is_upload_file: false,
  is_activated: false,
}

const AddPersyaratan = props => {
  const { open, onClose, setData, data, editData, title } = props
  const [formData, setFormData] = useState(initialData)
  const [error, setError] = useState(null)
  const [mutation, setMutation] = useState(null)
  const [variables, setVariables] = useState(null)

  const { data: apiData, error: apiError, isLoading } = useApiGraphql(mutation, variables)

  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      prodi_kode_prodi: '',
      nama: '',
      logo: '',
      url_check: '',
      response_should_be: '',
      is_upload_file: false,
      is_activated: false,
    }
  })

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      resetForm(editData);
    }
  }, [editData, resetForm]);

  const onSubmit = formData => {
    const mutationQuery = editData ? `
      mutation UpdateKkpSyarat($id: String!, $input: KkpSyaratInput!) {
        updateKkpSyarat(id: $id, input: $input) {
          id
          prodi_kode_prodi
          nama
        }
      }
    ` : `
      mutation CreateKkpSyarat($input: KkpSyaratInput!) {
        createKkpSyarat(input: $input) {
          id
          prodi_kode_prodi
          nama
        }
      }
    `;

    const variablesData = editData ? {
      id: editData.id,
      input: formData
    } : {
      input: formData
    };

    setMutation(mutationQuery)
    setVariables(variablesData)
  };

  useEffect(() => {
    if (apiData) {
      const updatedData = editData ? apiData.updateKkpSyarat : apiData.createKkpSyarat;

      setData(editData ? data.map(item => (item.id === updatedData.id ? updatedData : item)) : [...data, updatedData]);
      resetForm(initialData);
      setFormData(initialData);
      onClose();
    }

    if (apiError) {
      setError('Ada kesalahan saat menyimpan data.');
    }
  }, [apiData, apiError, editData, data, setData, resetForm, onClose]);

  const handleReset = () => {
    onClose()
    resetForm(initialData)
    setFormData(initialData)
    setError(null)
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
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>{title}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='text-2xl tabler-x' />
        </IconButton>
      </div>
      <Divider />
      <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
        <div className='p-6'>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-5'>
            <Controller
              name='prodi_kode_prodi'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Prodi Kode Prodi'
                  {...(errors.prodi_kode_prodi && { error: true, helperText: 'Kolom ini wajib diisi.' })}
                />
              )}
            />
            <Controller
              name='nama'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Nama'
                  {...(errors.nama && { error: true, helperText: 'Kolom ini wajib diisi.' })}
                />
              )}
            />
            <Controller
              name='logo'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Logo'
                />
              )}
            />
            <Controller
              name='url_check'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='URL Check'
                />
              )}
            />
            <Controller
              name='response_should_be'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Response Should Be'
                />
              )}
            />
            <div className='flex items-center'>
              <Controller
                name='is_upload_file'
                control={control}
                render={({ field }) => (
                  <>
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                    <Typography>Upload File</Typography>
                  </>
                )}
              />
            </div>
            <div className='flex items-center'>
              <Controller
                name='is_activated'
                control={control}
                render={({ field }) => (
                  <>
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                    <Typography>Aktif</Typography>
                  </>
                )}
              />
            </div>
            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Tambah
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
                Batalkan
              </Button>
            </div>
          </form>
        </div>
      </PerfectScrollbar>
    </Drawer>
  )
}

export default AddPersyaratan
