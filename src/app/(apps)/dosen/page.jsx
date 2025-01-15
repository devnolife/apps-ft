'use client'

import { useState } from 'react'

import dynamic from 'next/dynamic'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import CustomTabList from '@core/components/mui/TabList'

const ListPersyaratan = dynamic(() => import('@/views/dosen/ListPersyaratan'))
const ListPaMahasiswa = dynamic(() => import('@/views/dosen/ListMahasiswa'))
const ListMahasiswaKKP = dynamic(() => import('@/views/dosen/ListMahasiswaKkp'))
const TableSubmission = dynamic(() => import('@/views/dosen/TableSubmission'))

const TabContent = () => {
  const [activeTab, setActiveTab] = useState('list-mahasiswa')

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'list-mahasiswa':
        return <ListPaMahasiswa />
      case 'list-mahasiswa-kkp':
        return <ListMahasiswaKKP />
      case 'list-persyaratan':
        return <ListPersyaratan />
      default:
        return <div>Konten tidak tersedia</div>
    }
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-users' />} value='list-mahasiswa' label='Akademik' iconPosition='start' />
              <Tab icon={<i className='tabler-briefcase' />} value='list-mahasiswa-kkp' label='Kuliah Kerja Profesi' iconPosition='start' />
              <Tab
                icon={<i className='tabler-book' />}
                value='billing-plans'
                label='Ujian Akhir Semester'
                iconPosition='start'
              />
              <Tab
                icon={<i className='tabler-school' />}
                value='list-persyaratan'
                label='Persyaratan'
                iconPosition='start'
              />
              <Tab icon={<i className='tabler-link' />}
                value='pembimbing'
                label='Pembimbing'
                iconPosition='start'
              />
              <Tab icon={<i className='tabler-link' />}
                value='pengajuan'
                label='Pengajuan Kuliah Kerja'
                iconPosition='start'
              />
            </CustomTabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0' style={{ minHeight: '400px' }}>
              {renderTabContent()}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

const Dosen = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <TabContent />
      </Grid>
    </Grid>
  )
}

export default Dosen
