'use client'

import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Input, Typography } from '@mui/material'


const revenueData = [
  { name: 'Jan', pendapatan: 2000000 },
  { name: 'Feb', pendapatan: 3000000 },
  { name: 'Mar', pendapatan: 2500000 },
  { name: 'Apr', pendapatan: 4000000 },
  { name: 'Mei', pendapatan: 3500000 },
  { name: 'Jun', pendapatan: 5000000 },
]

export default function AdminDashboard() {
  const [mahasiswa, setMahasiswa] = useState([])

  useEffect(() => {
    // Simulasi data mahasiswa
    setMahasiswa([
      {
        id: '1',
        nama: 'John Doe',
        angkatan: '2020',
        jurusan: 'Informatika',
        status: 'Selesai',
        statusPembayaran: 'Lunas',
        tanggalDaftar: '2024-01-15',
        nomorSertifikat: '001/20240115/INF/2020'
      },
      {
        id: '2',
        nama: 'Jane Smith',
        angkatan: '2021',
        jurusan: 'Ekonomi',
        status: 'Dalam Proses',
        statusPembayaran: 'Lunas',
        tanggalDaftar: '2024-01-20'
      },
    ])
  }, [])

  const totalPendapatan = 5000000 // Rp 5.000.000
  const totalMahasiswa = mahasiswa.length
  const totalSelesai = mahasiswa.filter(m => m.status === 'Selesai').length

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-gray-500">Kelola pendaftaran dan sertifikasi baca Al-Quran</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Cari mahasiswa..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="contained">Export Data</Button>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Typography variant="h6" className="text-sm font-medium">Total Pendapatan</Typography>
            <i classname='tabler-tabler-credit-card' />
          </CardHeader>
          <CardContent>
            <motion.div className="text-2xl font-bold" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              Rp {totalPendapatan.toLocaleString('id-ID')}
            </motion.div>
            <p className="text-xs text-gray-500">
              +20.1% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Typography variant="h6" className="text-sm font-medium">Total Mahasiswa</Typography>
          </CardHeader>
          <CardContent>
            <motion.div className="text-2xl font-bold" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              {totalMahasiswa}
            </motion.div>
            <p className="text-xs text-gray-500">
              {totalMahasiswa} mahasiswa terdaftar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Typography variant="h6" className="text-sm font-medium">Total Selesai</Typography>
          </CardHeader>
          <CardContent>
            <motion.div className="text-2xl font-bold" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              {totalSelesai}
            </motion.div>
            <p className="text-xs text-gray-500">
              {totalSelesai} mahasiswa telah selesai
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grafik Pendapatan */}
      <Card>
        <CardHeader>
          Total pendapatan dari pendaftaran mahasiswa per bulan
        </CardHeader>
        {/* <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
                />
                <Bar dataKey="pendapatan" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent> */}
      </Card>

      {/* Tabel Mahasiswa */}
      <Card>
        <CardHeader>
          Daftar mahasiswa yang telah mendaftar program baca Al-Quran
        </CardHeader>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Angkatan</TableCell>
                  <TableCell>Jurusan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Pembayaran</TableCell>
                  <TableCell>Tanggal Daftar</TableCell>
                  <TableCell>No. Sertifikat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mahasiswa.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.nama}</TableCell>
                    <TableCell>{m.angkatan}</TableCell>
                    <TableCell>{m.jurusan}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.status === 'Selesai'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {m.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.statusPembayaran === 'Lunas'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {m.statusPembayaran}
                      </span>
                    </TableCell>
                    <TableCell>{m.tanggalDaftar}</TableCell>
                    <TableCell>{m.nomorSertifikat || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </motion.div >
  )
}
