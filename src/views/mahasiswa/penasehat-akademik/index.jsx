'use client'

import Grid from '@mui/material/Grid'

import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'
import './print.css'

const Preview = ({ mahasiswa, data, semester, onSemesterChange, signature }) => {
  const handlePrint = (selectedSemester) => {
    console.log(`Printing for ${selectedSemester}`)
    window.print()
  }

  const handleDownload = (selectedSemester) => {
    console.log(`Downloading for ${selectedSemester}`)
    alert(`Download initiated for ${selectedSemester}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <PreviewCard
          data={data}
          signature={signature}
          mahasiswa={mahasiswa} />
      </Grid>
      <Grid item xs={12} md={3}>
        <PreviewActions
          handleDownload={handleDownload}
          handlePrint={handlePrint}
          semester={semester}
          onSemesterChange={onSemesterChange} />
      </Grid>
    </Grid>
  )
}

export default Preview
