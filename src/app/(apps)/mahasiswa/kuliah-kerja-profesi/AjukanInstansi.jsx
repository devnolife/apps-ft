import { useState } from 'react';

import Image from 'next/image';

import axios from 'axios';
import { toast } from 'react-toastify';

import { Grid, Paper, Typography, Box, TextField, Button, Stack, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';

import UploadSingleFile from '@/components/image/UploadSingleFile';

const ajukan = true;

export default function AjukanInstansi() {
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: '',
      lokasi: '',
      keterangan: '',
      logo: null,
    },
  });

  // Helper function to create the GraphQL mutation query
  const createMutationQuery = (data) => `
    mutation AjukanKkpInstansi {
      ajukanKkpInstansi(
        createKkpInstansiInput: {
          nama: "${data.nama}",
          alamat: "${data.lokasi}",
          logo: "${data.logo || ''}",
          keterangan: "${data.keterangan}"
        }
      ) {
        id
      }
    }
  `;

  // Helper function to handle file upload (convert to Base64)
  const handleLogoToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject('Error converting file');
      reader.readAsDataURL(file);
    });
  };

  const submitInstansi = async (data) => {

    try {
      const response = await axios.post('https://superapps.if.unismuh.ac.id/graphql', {
        query: createMutationQuery(data),
      });

      const errors = response.data.errors;

      if (errors) {
        throw new Error(errors[0].message || 'Terjadi kesalahan.');
      }

      return response.data.data.ajukanKkpInstansi.id;
    } catch (error) {
      throw new Error(error.message || 'Terjadi kesalahan saat mengajukan permintaan.');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmissionError('');

    try {
      const logoBase64 = data.logo ? await handleLogoToBase64(data.logo) : null;

      const instansiId = await submitInstansi({ ...data, logo: logoBase64 });

      if (instansiId) {
        toast.success('Permintaan berhasil diajukan!');
      }
    } catch (error) {
      setSubmissionError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!ajukan) {
    return (
      <Paper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ p: 4, boxShadow: 2 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mt: 2 }}>
            Menunggu Persetujuan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pengajuan instansi Anda sedang dalam proses peninjauan. Kami akan memberi tahu Anda segera setelah ada
            pembaruan.
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
      </Paper>
    );
  }

  return (
    <Grid container spacing={3} sx={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Ajukan Instansi Baru
          </Typography>
          <Typography variant="body1" gutterBottom align="center" color="text.secondary">
            Lengkapi informasi di bawah untuk mengajukan instansi baru.
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <Controller
                name="nama"
                control={control}
                rules={{ required: 'Nama Instansi wajib diisi.', minLength: 3 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nama Instansi"
                    variant="outlined"
                    error={!!errors.nama}
                    helperText={errors.nama?.message}
                  />
                )}
              />
              <Controller
                name="lokasi"
                control={control}
                rules={{ required: 'Lokasi wajib diisi.' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Lokasi"
                    variant="outlined"
                    error={!!errors.lokasi}
                    helperText={errors.lokasi?.message}
                  />
                )}
              />
              <Controller
                name="keterangan"
                control={control}
                rules={{ required: 'Keterangan wajib diisi.' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Keterangan"
                    multiline
                    rows={3}
                    variant="outlined"
                    error={!!errors.keterangan}
                    helperText={errors.keterangan?.message}
                  />
                )}
              />
              <Controller
                name="logo"
                control={control}
                render={({ field }) => (
                  <UploadSingleFile
                    textHeader="Upload Logo"
                    onUpload={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                )}
              />
              {submissionError && (
                <Typography variant="body2" color="error">
                  {submissionError}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Kirim Permintaan'}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
