/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'
import {
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
  Chip
} from '@mui/material'


import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import TimelineCenter from './TimeLine'
import DetailPersyaratan from './DetailPersyaratan'
import CustomAvatar from '@core/components/mui/Avatar'

const colors = ["primary.light", "secondary", "success", "error.light", "warning", "info"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function DashboardPage() {
  const kodeProdi = 55202
  const [persyaratan, setPersyaratan] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [instansi, setInstansi] = useState([])
  const [instansiApprovals, setInstansiApprovals] = useState([])
  const [activeTab, setActiveTab] = useState('persyaratan')

  const handleClickOpen = (detail) => {
    setSelectedDetail(detail)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedDetail(null)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    console.log('Uploaded file:', file)

  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query GetKkpSyaratByKodeProdi {
            getKkpSyaratByKodeProdi(kodeProdi: "${kodeProdi}") {
              id
              nama
              logo
              is_upload_file
              is_activated
            }
          }
        `

        const response = await axios.post('https://superapps.if.unismuh.ac.id/graphql', { query })

        setPersyaratan(
          response.data?.data?.getKkpSyaratByKodeProdi.map(item => ({
            ...item,
            file: item.is_upload_file ? 'Iya' : 'Tidak',
            aktif: item.is_activated ? 'Aktif' : 'Tidak Aktif'
          }))
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchInstansiApprovals = async () => {
      const queryInstansi = `
        query GetAllKkpInstansiApprovals {
          getAllKkpInstansiApprovals {
            kkpInstansi {
              id
              nama
              alamat
              keterangan
              logo
              is_activated
            }
          }
        }
      `

      const response = await axios.post('https://superapps.if.unismuh.ac.id/graphql', { query: queryInstansi })

      setInstansiApprovals(response.data?.data?.getAllKkpInstansiApprovals || [])
    }

    fetchInstansiApprovals()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Kuliah Kerja Profesi & Plus
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Panduan dan informasi terkait kuliah kerja profesi dan kuliah kerja profesi plus
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ maxWidth: '100%', p: 2 }}>
            <CardContent sx={{ padding: 4 }} className="flex flex-wrap items-center justify-between gap-4">
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
        </Grid>
      </Grid>

      <Grid container spacing={4} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" startIcon={<i className='tabler-plus' />}>
            Daftar Magang Baru
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Lihat Timeline
          </Button>
        </Grid>
      </Grid>

      <TabContext value={activeTab}>
        <TabList onChange={handleTabChange} variant='fullWidth'>
          <Tab icon={<i className='tabler-users' />} label='Persyaratan KKP' value='persyaratan' />
          <Tab icon={<i className='tabler-clock' />} label='Timeline KKP' value='timeline' />
          <Tab icon={<i className='tabler-building' />} label='List Instansi KKP' value='list-instansi' />
          <Tab icon={<i className='tabler-plus' />} label='Ajukan Instansi Baru' value='ajukan-instansi' />
        </TabList>
        <TabPanel value='persyaratan'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Persyaratan Kuliah Kerja Profesi
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: '1rem' }}>No</TableCell>
                          <TableCell sx={{ fontSize: '1rem' }}>Persyaratan</TableCell>
                          <TableCell sx={{ fontSize: '1rem' }}>Upload File</TableCell>
                          <TableCell sx={{ fontSize: '1rem' }}>Aktif</TableCell>
                          <TableCell sx={{ fontSize: '1rem' }}>Detail</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {persyaratan.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell sx={{ fontSize: '1rem' }}>{index + 1}</TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                  <CustomAvatar color={getRandomColor()} variant="rounded" size={24} skin="light">
                                    <i className={item.logo} />
                                  </CustomAvatar>
                                </Grid>
                                <Grid item color={getRandomColor()}>
                                  <Typography variant="body1">{item.nama}</Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Chip
                                icon={<CustomAvatar color={item.file === 'Iya' ? 'success' : 'error'} variant="rounded" size={24} skin="light">
                                  <i className={item.file === 'Iya' ? 'tabler-file-check' : 'tabler-file-x'} />
                                </CustomAvatar>}
                                variant="tonal"
                                label={item.file}
                                color={item.file === 'Iya' ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Chip
                                icon={<CustomAvatar color={item.aktif === 'Aktif' ? 'success' : 'error'} variant="rounded" size={24} skin="light">
                                  <i className={item.aktif === 'Aktif' ? 'tabler-check' : 'tabler-x'} />
                                </CustomAvatar>}
                                variant="tonal"
                                label={item.aktif}
                                color={item.aktif === 'Aktif' ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: '1rem' }}>
                              <Button size='small'
                                variant="contained" startIcon={<i className="tabler-info-circle" />} onClick={() => handleClickOpen(item)}>
                                Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='timeline'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Timeline KKP</Typography>
                  <TimelineCenter />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='list-instansi'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>List Instansi KKP</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Instansi</TableCell>
                          <TableCell>Alamat</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {instansiApprovals.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{item.kkpInstansi.nama}</TableCell>
                            <TableCell>{item.kkpInstansi.alamat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='ajukan-instansi'>
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper sx={{ p: 2 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Grid sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                        <i className='tabler-building' />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">PT Teknologi {i}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Jakarta Selatan
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </TabContext>

      <DetailPersyaratan
        open={open}
        handleClose={handleClose}
        selectedDetail={selectedDetail}
        handleFileUpload={handleFileUpload}
      />
    </Container>
  )
}

