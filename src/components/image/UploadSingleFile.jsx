'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useDropzone } from 'react-dropzone'

import CustomAvatar from '@core/components/mui/Avatar'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

const UploadSingleFile = ({ textHeader, onUpload }) => {

  const [file, setFile] = useState(null)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0])
    },
    multiple: false
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return (
        <div style={{ width: '187px', height: '187px', overflow: 'hidden', margin: '0 auto' }}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleUploadFile = () => {
    if (file && onUpload) {
      // onUpload(file)
      console.log("upload file")
    }
  }

  return (
    <Dropzone>
      <Card>
        <CardHeader
          title={textHeader}
          sx={{
            '& .MuiCardHeader-action': { alignSelf: 'center' }
          }}
        />
        <CardContent>
          {!file && (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='flex flex-col items-center gap-2 text-center'>
                <CustomAvatar variant='rounded' skin='light' color='secondary'>
                  <i className='tabler-upload' />
                </CustomAvatar>
                <Typography variant='h5'>Seret dan Lepaskan Gambar Anda Di Sini.</Typography>
                <Typography color='text.disabled'>atau</Typography>
                <Button variant='tonal' size='small'>
                  Pilih Gambar
                </Button>
              </div>
            </div>
          )}
          {file ? (
            <>
              <div className='file-details' style={{ textAlign: 'center', position: 'relative' }}>
                <div className='file-preview'>{renderFilePreview(file)}</div>
                <Typography className='font-medium file-name' color='text.primary'>
                  {file.name}
                </Typography>
                <Typography className='file-size' variant='body2'>
                  {Math.round(file.size / 100) / 10 > 1000
                    ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                    : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                </Typography>
              </div>
              <div className='buttons' style={{ textAlign: 'center', marginTop: '10px' }}>
                <Button size='small' color='error' variant='tonal' onClick={handleRemoveFile}>
                  Batalkan
                </Button>
                <Button size='small'
                  variant='contained' style={{ marginLeft: '8px' }} onClick={handleUploadFile}>
                  Unggah File
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default UploadSingleFile
