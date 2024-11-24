import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const PreviewActions = ({ semester, onSemesterChange, handleDownload, handlePrint }) => {
  const router = useRouter()

  return (
    <Card>
      {/* Header */}
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Aksi Kartu Kontrol
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Pilih semester dan lakukan aksi yang tersedia
          </Typography>
        }
      />
      <Divider />

      {/* Content */}
      <CardContent className="flex flex-col gap-4">
        {/* Pilih Semester */}
        <Select
          size="small"
          fullWidth
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="Semester 1">Semester 1</MenuItem>
          <MenuItem value="Semester 2">Semester 2</MenuItem>
          <MenuItem value="Semester 3">Semester 3</MenuItem>
          <MenuItem value="Semester 4">Semester 4</MenuItem>
          <MenuItem value="Semester 5">Semester 5</MenuItem>
          <MenuItem value="Semester 6">Semester 6</MenuItem>
          <MenuItem value="Semester 7">Semester 7</MenuItem>
          <MenuItem value="Semester 8">Semester 8</MenuItem>
        </Select>

        {/* Tombol Aksi */}
        <Button
          onClick={handlePrint}
          variant="contained"
          color="primary"
          sx={{ textTransform: 'capitalize' }}
        >
          Print
        </Button>
        <Button
          onClick={handleDownload}
          variant="outlined"
          color="secondary"
          sx={{ textTransform: 'capitalize' }}
        >
          Download
        </Button>
        <Button
          onClick={() => router.back()} // Navigasi ke halaman sebelumnya
          variant="text"
          color="error"
          sx={{ textTransform: 'capitalize' }}
        >
          Kembali
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
