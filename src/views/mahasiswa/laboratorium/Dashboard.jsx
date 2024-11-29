/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'


import DirectionalIcon from '@components/DirectionalIcon'

const chipColor = {
  'Semester 1': { color: 'primary' },
  'Semester 2': { color: 'success' },
  'Semester 3': { color: 'error' },
  'Semester 4': { color: 'warning' },
  'Semester 5': { color: 'info' },
  'Semester 6': { color: 'secondary' }
}

const DashboardLab = ({ courseData, searchValue }) => {
  const [course, setCourse] = useState('All')
  const [hideCompleted, setHideCompleted] = useState(false)
  const [filteredData, setFilteredData] = useState(courseData)
  const [activePage, setActivePage] = useState(0)

  const handleChange = (event) => {
    setHideCompleted(event.target.checked);
  };

  useEffect(() => {
    let newData = courseData;

    if (hideCompleted) {
      newData = newData.filter(courseItem => !courseItem.selesai);
    }

    if (course !== 'All') {
      newData = newData.filter(courseItem => courseItem.semester === course);
    }

    if (searchValue) {
      newData = newData.filter(category => category.namaLab.toLowerCase().includes(searchValue.toLowerCase()));
    }

    setFilteredData(newData);
  }, [searchValue, course, hideCompleted]);

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>Praktikum Prodi Informatika</Typography>
            <Typography>{`${courseData.length} Jumlah Praktikum yang ingin dilaksanakan`}</Typography>
          </div>
          <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <FormControl fullWidth size='small' className='is-[250px] flex-auto'>
              <Select
                fullWidth
                id='select-course'
                value={course}
                onChange={e => {
                  setCourse(e.target.value)
                  setActivePage(0)
                }}
                labelId='course-select'
              >
                <MenuItem value='All'>Semua Pratikum</MenuItem>
                {Object.keys(chipColor).map(semester => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={hideCompleted} />}
              label='Praktikum Yang Belum Selesai'
            />
          </div>
        </div>
        {filteredData.length > 0 ? (
          <Grid container spacing={6}>
            {filteredData.slice(activePage * 6, activePage * 6 + 6).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className='flex flex-col justify-between h-full'>
                  <div>
                    <img src={item.gambarLab} alt={item.namaLab} className='w-full h-[200px] object-cover' />
                    <CardContent className='flex flex-col gap-4 p-5'>
                      <div className='flex items-center justify-between'>
                        <Chip
                          label={item.semester}
                          variant='tonal'
                          size='small'
                          color={chipColor[item.semester]?.color || 'default'}
                        />
                        <Typography>{`(${item.pengurusLab})`}</Typography>
                      </div>
                      <Typography
                        variant='h5'
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='hover:text-primary'
                      >
                        {item.namaLab}
                      </Typography>
                      <Typography className='overflow-hidden text-ellipsis' title={item.desc}>
                        {item.desc}
                      </Typography>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <i className='text-xl tabler-clock' />
                          <Typography>{`${item.time} Menit`}</Typography>
                        </div>
                        <div className='flex items-center gap-1'>
                          <i className='text-xl tabler-checklist' />
                          <Typography>{`${item.pertemuan}/${item.total_pertemuan}`}</Typography>
                        </div>
                      </div>

                    </CardContent>
                  </div>
                  <div className='p-5 pt-0'>
                    <LinearProgress
                      color='primary'
                      value={Math.floor((item.pertemuan / item.total_pertemuan) * 100)}
                      variant='determinate'
                      className='mb-4 is-full bs-2'
                    />
                    {item.pertemuan === item.total_pertemuan ? (
                      <Button
                        variant='contained'
                        color='success'
                        endIcon={
                          <DirectionalIcon ltrIconClass='tabler-checklist' rtlIconClass='tabler-chevron-left' />
                        }
                        component={Link}
                        href={'/mahasiswa/laboratorium/sertifikat'}
                        className='w-full'
                      >
                        Sertifikat
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant='tonal'
                        endIcon={
                          <DirectionalIcon ltrIconClass='tabler-chevron-right' rtlIconClass='tabler-chevron-left' />
                        }
                        component={Link}
                        href={'/apps/academy/lab-details'}
                        className='w-full'
                      >
                        Lanjutkan
                      </Button>
                    )}
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className='text-center'>Tidak ada kursus yang ditemukan</Typography>
        )}
        <div className='flex justify-center'>
          <Pagination
            count={Math.ceil(filteredData.length / 6)}
            page={activePage + 1}
            showFirstButton
            showLastButton
            shape='rounded'
            variant='tonal'
            color='primary'
            onChange={(e, page) => setActivePage(page - 1)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardLab
