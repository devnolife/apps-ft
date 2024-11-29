'use client';

import React, { useState } from 'react';

import { Button, Dialog, Container, TextField, Typography, Grid, Box, Card, CardContent, Pagination, Avatar } from '@mui/material';

import { useDropzone } from 'react-dropzone';

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker';
import CustomTextField from '@core/components/mui/TextField';
import KegiatanLaporan from './KegiatanLaporan';

const FormKegiatan = ({ activitiesData }) => {
  const initialActivities = [{ date: '', activity: '', upload: '' }];
  const [activities, setActivities] = useState(initialActivities);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddActivity = () => {
    const currentActivity = activities[currentPage - 1];

    if (!currentActivity.date || !currentActivity.activity || !currentActivity.upload) {
      setErrorMessage('Semua field harus diisi sebelum menambahkan kegiatan baru.');

      return;
    }

    setErrorMessage('');
    setActivities([...activities, { date: '', activity: '', upload: '' }]);
    setCurrentPage(activities.length + 1);
  };

  const handleChange = (index, field, value) => {
    const updatedActivities = [...activities];

    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFileUpload = (index, files) => {
    const updatedActivities = [...activities];

    updatedActivities[index].upload = files[0];
    setActivities(updatedActivities);
  };

  const handleSubmit = () => {
    const hasIncompleteActivity = activities.some(
      activity => !activity.date || !activity.activity || !activity.upload
    );

    if (hasIncompleteActivity) {
      setErrorMessage('Semua field harus diisi lengkap sebelum disimpan.');

      return;
    }

    setErrorMessage('');

  };

  const handleReset = () => {
    setActivities(initialActivities);
    setCurrentPage(1);
    setErrorMessage('');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FileUploaderSingle = ({ index }) => {
    const [files, setFiles] = useState(
      activities[index].upload ? [activities[index].upload] : []
    );

    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg'],
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles);
        handleFileUpload(index, acceptedFiles);
      },
    });

    const img = files.map(file => (
      <img
        key={file.name}
        alt={file.name}
        className='single-file-image'
        src={URL.createObjectURL(file)}
        style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }}
      />
    ));

    return (
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          border: '2px dashed #ccc',
          p: 2,
          textAlign: 'center',
          borderRadius: 2,
          backgroundColor: '#fafafa',
        }}
      >
        <input {...getInputProps()} />
        {files.length ? (
          img
        ) : (
          <div className='flex flex-col items-center'>
            <Avatar variant='rounded' sx={{ mb: 2, backgroundColor: '#e0e0e0' }}>
              <i className='tabler-upload' />
            </Avatar>
            <Typography variant='body1'>
              Seret dan lepas file atau klik di sini.
            </Typography>
          </div>
        )}
      </Box>
    );
  };

  return (
    <>
      <Grid >
        {paginatedActivities.map((activity, index) => (
          <Card key={index} sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Grid container justifyContent='space-between' alignItems='center' sx={{ marginBottom: 2 }}>
                <Typography variant='h5'>
                  Kegiatan Harian Kuliah Kerja Profesi
                </Typography>
                <Button
                  variant='contained'
                  color='success'
                  sx={{ textTransform: 'none' }}
                  onClick={handleOpenDialog}
                >
                  Lihat Kegiatan
                </Button>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} sx={{ marginBottom: 2 }}>
                  <AppReactDatepicker
                    selected={activity.date}
                    id={`date-${index}`}
                    onChange={date =>
                      handleChange((currentPage - 1) * itemsPerPage + index, 'date', date)
                    }
                    placeholderText='Pilih Tanggal'
                    customInput={
                      <CustomTextField label='Tanggal Kegiatan' fullWidth />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                  marginTop: '18px'
                }}>
                  <TextField
                    size='small'
                    label='Lokasi Kegiatan'
                    value={activity.location || ''}
                    onChange={e =>
                      handleChange(
                        (currentPage - 1) * itemsPerPage + index,
                        'location',
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id={`activity-${index}`}
                    label='Deskripsi Kegiatan'
                    multiline
                    rows={4}
                    value={activity.activity}
                    onChange={e =>
                      handleChange(
                        (currentPage - 1) * itemsPerPage + index,
                        'activity',
                        e.target.value
                      )
                    }
                    placeholder='Jelaskan kegiatan atau pekerjaan yang dilakukan pada hari tersebut'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' gutterBottom>
                    Upload Foto Kegiatan *
                  </Typography>
                  <FileUploaderSingle index={(currentPage - 1) * itemsPerPage + index} />
                </Grid>
              </Grid>
              {errorMessage && (
                <Typography
                  variant='body2'
                  color='error'
                  sx={{ mt: 2 }}
                >
                  {errorMessage}
                </Typography>
              )}
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                pb: 2,
              }}
            >
              <Typography variant='body2' color='textSecondary' sx={{
                marginLeft: '20px'
              }}>
                {`Kegiatan ${index + 1} dari ${activities.length}`}
              </Typography>
              <Box sx={{
                marginBottom: '20px',
                marginRight: '20px'
              }}>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={handleReset}
                  sx={{
                    marginRight: '15px'
                  }}
                >
                  Batalkan
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Simpan Kegiatan
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: 3 }}
        >
          <Button
            variant='outlined'
            color='primary'
            onClick={handleAddActivity}
          >
            Tambah Kegiatan
          </Button>
          <Pagination
            count={Math.ceil(activities.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth='md'
      >
        <KegiatanLaporan
          data={activitiesData}
          onClose={handleCloseDialog} />
      </Dialog>
    </>
  );
};

export default FormKegiatan;
