/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from 'react'

import Grid from '@mui/material/Grid'

import SearchHeader from "@/views/mahasiswa/laboratorium/HeaderSearch"
import DashboardLab from "@/views/mahasiswa/laboratorium/Dashboard"


const data = [
  {
    namaLab: 'Pemrograman Dasar',
    semester: 'Semester 1',
    colorSemester: 'primary',
    pengurusLab: 'Dai Daifullah',
    gambarLab: 'https://c4.wallpaperflare.com/wallpaper/974/747/684/java-developer-hd-wallpaper-preview.jpg',
    desc: 'Lab ini fokus pada dasar-dasar pemrograman menggunakan bahasa Java.',
    pertemuan: 10,
    total_pertemuan: 10,
    time: 180,
    selesai: true
  },
  {
    namaLab: 'Basic Command Line, Git & Github',
    semester: 'Semester 1',
    colorSemester: 'primary',
    pengurusLab: 'Akbar DB Posgrest',
    gambarLab: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Lab ini mendalami algoritma dan struktur data menggunakan C++.',
    pertemuan: 2,
    total_pertemuan: 12,
    time: 120,
    selesai: true
  },
  {
    namaLab: 'Algoritma & Struktur Data',
    semester: 'Semester 2',
    colorSemester: 'secondary',
    pengurusLab: 'Asgart Asgard',
    gambarLab: 'https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desc: 'Lab ini mengajarkan dasar-dasar jaringan komputer dan protokol jaringan.',
    pertemuan: 8,
    total_pertemuan: 10,
    time: 120,
    selesai: true
  },
  {
    namaLab: 'Database',
    semester: 'Semester 4',
    colorSemester: 'warning',
    pengurusLab: 'Emily Davis',
    gambarLab: '/images/lab-database.jpg',
    desc: 'Lab ini berfokus pada desain dan manajemen database menggunakan MySQL.',
    pertemuan: 9,
    total_pertemuan: 10,
    time: 100,
    selesai: false
  },
  {
    namaLab: 'Cloud Computing',
    semester: 'Semester 5',
    colorSemester: 'info',
    pengurusLab: 'Michael Johnson',
    gambarLab: '/images/lab-cloud.jpg',
    desc: 'Lab ini mengeksplorasi komputasi awan dan penerapannya menggunakan AWS.',
    pertemuan: 2,
    total_pertemuan: 4,
    time: 60,
    selesai: false
  }
];

const Laboratorium = async () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      </Grid>
      <Grid item xs={12}>
        <DashboardLab searchValue={searchValue} courseData={data} />
      </Grid>
    </Grid>
  )
}

export default Laboratorium
