import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const WelcomeCard = ({ jumlahSurat }) => {
  return (
    <Card>
      <CardContent>
        {/* Konten Utama */}
        <Grid container spacing={2}>
          {/* Teks dan Tombol */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Administrasi Umum
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Jumlah Pengajuan Surat:
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {jumlahSurat}
            </Typography>
            <Button variant="contained" color="primary">
              Lihat Dokumen
            </Button>
          </Grid>

          {/* Gambar */}
          <Grid item xs={12} md={4} style={{ position: 'relative', textAlign: 'center' }}>
            <img
              alt="Administrasi Umum"
              src="/images/illustrations/characters/6.png"
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
                position: 'relative'
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
