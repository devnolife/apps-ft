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
  Chip,
  TextField,
  Box
} from '@mui/material'

import { motion } from 'framer-motion'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import DetailPersyaratan from './DetailPersyaratan'
import CustomAvatar from '@core/components/mui/Avatar'

import PersyaratanKKP from './PersyaratanKKP'
import TimelineKKP from './TimelineKKP'
import ListInstansiKKP from './ListInstansiKKP'
import AjukanInstansi from './AjukanInstansi'

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

  const [newInstansi, setNewInstansi] = useState({
    nama: '',
    lokasi: '',
    keterangan: '',
    logo: null
  })

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

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setNewInstansi({ ...newInstansi, [name]: value })
  }

  const handleLogoUpload = (e) => {
    setNewInstansi({ ...newInstansi, logo: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Handle form submission logic here
    console.log('New Instansi:', newInstansi)
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
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Kuliah Kerja Profesi & Plus
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Panduan dan informasi terkait kuliah kerja profesi dan kuliah kerja profesi plus
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              maxWidth: "100%",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            component={motion.div}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ maxWidth: '100%', p: 2 }}
          >
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

      <TabContext value={activeTab}>
        <TabList onChange={handleTabChange} variant='fullWidth'>
          <Tab icon={<i className='tabler-users' />} label='Persyaratan KKP' value='persyaratan' />
          <Tab icon={<i className='tabler-clock' />} label='Timeline KKP' value='timeline' />
          <Tab icon={<i className='tabler-building' />} label='List Instansi KKP' value='list-instansi' />
          <Tab icon={<i className='tabler-plus' />} label='Ajukan Instansi Baru' value='ajukan-instansi' />
        </TabList>
        <TabPanel value='persyaratan'>
          <PersyaratanKKP
            persyaratan={persyaratan}
            handleClickOpen={handleClickOpen}
            getRandomColor={getRandomColor}
          />
        </TabPanel>
        <TabPanel value='timeline'>
          <TimelineKKP />
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

