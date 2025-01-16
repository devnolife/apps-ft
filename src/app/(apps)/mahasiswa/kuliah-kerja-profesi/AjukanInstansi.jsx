import { Grid, Paper, Typography, Box, TextField, Button, IconButton, Stack } from '@mui/material';

export default function AjukanInstansi({
  newInstansi,
  handleInputChange,
  handleLogoUpload,
  handleSubmit
}) {
  return (
    <Grid container spacing={3} sx={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Ajukan Instansi Baru
          </Typography>
          <Typography variant="body1" gutterBottom align="center" color="text.secondary">
            Lengkapi informasi di bawah untuk mengajukan instansi baru.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nama Instansi"
                name="nama"
                value={newInstansi.nama}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
              <TextField
                fullWidth
                label="Lokasi"
                name="lokasi"
                value={newInstansi.lokasi}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
              <TextField
                fullWidth
                label="Keterangan"
                name="keterangan"
                value={newInstansi.keterangan}
                onChange={handleInputChange}
                multiline
                rows={3}
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" startIcon={
                  <i classname='tabler-icon-upload' style={{ fontSize: '1.25rem' }} />
                }>
                  Upload Logo
                  <input type="file" hidden onChange={handleLogoUpload} />
                </Button>
                {newInstansi.logo && (
                  <Typography variant="body2" color="text.secondary">
                    {newInstansi.logo.name}
                  </Typography>
                )}
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
