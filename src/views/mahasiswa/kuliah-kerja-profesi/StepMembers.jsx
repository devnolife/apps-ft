import { useState } from 'react';

import { Grid, Typography, Paper, Avatar, InputAdornment, Button, Box, IconButton, useMediaQuery, useTheme, Card } from '@mui/material';

import CustomTextField from '@/@core/components/mui/TextField';

const StepAnggota = ({ handleNext }) => {
  const [nim, setNim] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatName = (name) => {
    const words = name.split(' ');

    if (words.length <= 3) {
      return name;
    } else {
      const firstThree = words.slice(0, 3);
      const initials = words.slice(3).map(word => word[0].toUpperCase()).join('');


      return `${firstThree.join(' ')} ${initials}`;
    }
  };

  const handleAddMember = () => {
    if (selectedStudent && groupMembers.length < 4) {
      setGroupMembers([...groupMembers, selectedStudent]);
      setSelectedStudent(null);
      setNim(''); // Clear NIM input after adding
    }
  };

  const handleSave = () => {
    if (groupMembers.length >= 2 && groupMembers.length <= 4) {
      handleNext();
    } else {
      setErrors({ members: 'Anggota tim harus terdiri dari 2 hingga 4 orang.' });
    }
  };

  const handleCancel = () => {
    setNim('');
    setSelectedStudent(null);
    setGroupMembers([]);
    setErrors({});
  };

  const handleSearchStudent = async () => {
    if (nim.length === 12) {
      // Cek apakah mahasiswa sudah menjadi anggota
      if (groupMembers.some(member => member.nim === nim)) {
        setErrors({ search: 'Mahasiswa ini sudah menjadi anggota tim.' });

        return;
      }

      const query = `
      query Mahasiswa($nim: String!) {
        mahasiswa(nim: $nim) {
          nim
          kodeProdi
          nama
        }
      }
      `;

      const variables = { nim };

      try {
        const response = await fetch('https://sicekcok.if.unismuh.ac.id/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          setErrors({ search: 'Mahasiswa tidak ditemukan atau terjadi kesalahan.' });
        } else if (data && data.mahasiswa) {
          const student = {
            nim: data.mahasiswa.nim,
            nama: data.mahasiswa.nama,
            prodi: data.mahasiswa.kodeProdi,
            avatar: `https://simak.unismuh.ac.id/upload/mahasiswa/${data.mahasiswa.nim}.jpg`,
          };

          setSelectedStudent(student);
          setErrors({});
        } else {
          setErrors({ search: 'Mahasiswa tidak ditemukan.' });
        }
      } catch (error) {
        setErrors({ search: 'Terjadi kesalahan saat mencari mahasiswa.' });
      }
    } else {
      setErrors({ search: 'NIM harus 12 karakter.' });
    }
  };

  return (
    <Grid container alignItems="center" spacing={4} sx={{ padding: 3 }}>
      <Grid item xs={12} md={6}>
        <img src="/gif/anggota.gif" alt="anggota" width="80%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 5, textAlign: 'center', minHeight: '400px' }}>
          <Typography variant="h4" gutterBottom>
            Cari Anggota Kelompok
          </Typography>

          {groupMembers.length < 4 && (
            <Box component="form" noValidate autoComplete="off">
              <CustomTextField
                label="NIM"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchStudent();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-id" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearchStudent}
                        edge="end"
                      >
                        <i className="tabler-search" style={{ fontSize: '2rem' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.search}
                helperText={errors.search}
              />
            </Box>
          )}

          {selectedStudent && (
            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
              <Typography variant="h6">Detail Mahasiswa:</Typography>
              <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
                <Avatar
                  src={selectedStudent.avatar}
                  alt={selectedStudent.nama}
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="body1">{formatName(selectedStudent.nama)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedStudent.nim} - {selectedStudent.prodi}
                  </Typography>
                </Box>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMember}
                disabled={groupMembers.length >= 4}
                sx={{ marginTop: 2 }}
              >
                Tambahkan Anggota
              </Button>
            </Box>
          )}

          {errors.members && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {errors.members}
            </Typography>
          )}
          <Box sx={{ marginTop: 4 }}>
            <Typography
              sx={{
                paddingLeft: 2,
                textAlign: 'left',
                fontWeight: 'bold',
              }}
              variant="h6">Anggota Tim:</Typography>
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: 2,
                justifyContent: groupMembers.length === 2 ? 'center' : 'flex-start',
              }}
            >
              {groupMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      textAlign: 'center',
                      position: 'relative',
                      height: '100%',
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      alt={member.nama}
                      sx={{ width: 70, height: 70, marginRight: 3 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {formatName(member.nama)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.nim} - {member.prodi}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        const newMembers = groupMembers.filter((_, i) => i !== index);

                        setGroupMembers(newMembers);
                      }}
                      sx={{ position: 'absolute', top: -4, right: -4 }}
                    >
                      <i className='text-xl tabler-x text-actionActive' />
                    </IconButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid container justifyContent="flex-end" gap={2} marginTop={3}>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Batalkan
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={groupMembers.length < 2}>
              Simpan
            </Button>
          </Grid>
          <Typography variant="caption" color="text.secondary">
            * Pastikan data yang diinputkan sudah benar.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StepAnggota;
