import React from 'react';
import { List, ListItem, LinearProgress, ListItemText, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import CustomAvatar from '@core/components/mui/Avatar';

const validationItems = [
  {
    name: 'Transkrip Nilai Minimal 120 SKS telah dilulusi',
    status: 'Selesai',
    description: 'Minimum of 120 SKS credits have been completed'
  },
  {
    name: 'Minimal 1 Dokumen/Sertifikat Kompetensi sesuai bidang Informatika dan sudah di Validasi pada https://skpi.unismuh.ac.id/',
    status: 'Belum Selesai',
    description: 'At least one Competency Document/Certificate in Informatics, validated at skpi.unismuh.ac.id'
  },
  {
    name: 'Sertifikat Baca Al Qur’an',
    status: 'Belum Selesai',
    description: 'Quran Reading Certificate'
  },
  {
    name: 'Bukti Pembayaran KKP-PLUS',
    status: 'Belum Selesai',
    description: 'Proof of Payment for KKP-PLUS'
  }
];

const Validation = () => {
  return (
    <div>
      <h2>Validation Status</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Validasi</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Keterangan</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validationItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.status === 'Belum Selesai' && (
                    <Button variant='contained' color='primary'>
                      Tambahkan Validasi
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Validation;

