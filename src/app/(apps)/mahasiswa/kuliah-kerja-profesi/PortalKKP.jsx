'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kuliah Kerja Profesi & Plus
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Panduan dan informasi terkait kuliah kerja profesi dan kuliah kerja profesi plus
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Card sx={{ maxWidth: '100%', p: 2 }}>
          <CardContent sx={{
            padding: 4
          }}
            className="flex flex-wrap items-center justify-between gap-4 ">
            <div className="flex items-center gap-3">
              <CustomAvatar color="success" variant="rounded" size={40} skin="light">
                <i className="tabler-users" />
              </CustomAvatar>
              <div>
                <Typography variant="h6" className="font-semibold">
                  Jumlah Anggota
                </Typography>
                <Typography variant="body2">2–4 orang per kelompok</Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CustomAvatar color="warning" variant="rounded" size={40} skin="light">
                <i className="tabler-clock" />
              </CustomAvatar>
              <div>
                <Typography variant="h6" className="font-semibold">
                  Waktu Pelaksanaan
                </Typography>
                <Typography variant="body2">
                  Semester Ganjil: mulai semester 7 <br />
                  Semester Genap: mulai semester 8
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>

      {/* Action Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button variant="contained" startIcon={
          <i className='tabler-plus' />
        }>
          Daftar Magang Baru
        </Button>
      </Box>

      {/* Requirements Table */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Persyaratan Magang
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Persyaratan</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Minimal Semester 5</TableCell>
                  <TableCell>
                    <Chip label="Terpenuhi" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>IPK Minimal 3.0</TableCell>
                  <TableCell>
                    <Chip label="Terpenuhi" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Lulus Mata Kuliah Wajib</TableCell>
                  <TableCell>
                    <Chip label="Dalam Proses" color="warning" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Registered Internships */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pendaftaran Magang
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Perusahaan</TableCell>
                  <TableCell>Posisi</TableCell>
                  <TableCell>Tanggal Daftar</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>PT Teknologi Indonesia</TableCell>
                  <TableCell>Frontend Developer</TableCell>
                  <TableCell>2024-01-05</TableCell>
                  <TableCell>
                    <Chip label="Disetujui" color="success" size="small" />
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <LinearProgress variant="determinate" value={75} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PT Maju Bersama</TableCell>
                  <TableCell>UI/UX Designer</TableCell>
                  <TableCell>2024-01-03</TableCell>
                  <TableCell>
                    <Chip label="Menunggu" color="warning" size="small" />
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <LinearProgress variant="determinate" value={30} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Approved Companies */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Perusahaan Mitra
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                      <i className='tabler-building' />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">PT Teknologi {i}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Jakarta Selatan
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

