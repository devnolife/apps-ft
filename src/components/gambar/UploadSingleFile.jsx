'use client'


import { useState } from 'react'


import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useDropzone } from 'react-dropzone'
import Link from '@components/Link'
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

const UploadSingleFile = () => {

  const [file, setFile] = useState(null)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0])
    },
    multiple: false // Allow only one file
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={200} height={200} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  return (
    <Dropzone>
      <Card>
        <CardHeader
          title='Product Image'
          action={
            <Typography component={Link} color='primary' className='font-medium'>
              Add media from URL
            </Typography>
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
        />
        <CardContent>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='flex flex-col items-center gap-2 text-center'>
              <CustomAvatar variant='rounded' skin='light' color='secondary'>
                <i className='tabler-upload' />
              </CustomAvatar>
              <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
              <Typography color='text.disabled'>or</Typography>
              <Button variant='tonal' size='small'>
                Browse Image
              </Button>
            </div>
          </div>
          {file ? (
            <>
              <div className='file-preview mt-4'>{renderFilePreview(file)}</div>
              <List>
                <ListItem key={file.name} className='pis-4 plb-3'>
                  <div className='file-details'>
                    <div>
                      <Typography className='font-medium file-name' color='text.primary'>
                        {file.name}
                      </Typography>
                      <Typography className='file-size' variant='body2'>
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                      </Typography>
                    </div>
                  </div>
                  <IconButton onClick={handleRemoveFile}>
                    <i className='text-xl tabler-x' />
                  </IconButton>
                </ListItem>
              </List>
              <div className='buttons'>
                <Button color='error' variant='tonal' onClick={handleRemoveFile}>
                  Remove
                </Button>
                <Button variant='contained'>Upload File</Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default UploadSingleFile
