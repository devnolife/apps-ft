import React, { useState, useEffect } from 'react'

import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Grid, Chip, Box, CircularProgress
} from '@mui/material'

import { motion } from 'framer-motion'

import CustomAvatar from '@core/components/mui/Avatar'

export default function PersyaratanKKP({ persyaratan, handleClickOpen, getRandomColor }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [persyaratan]);

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ overflow: 'hidden', maxHeight: '100%' }} // Add this line to hide scrollbar
    >
      <CardContent sx={{ overflow: 'hidden' }}> {/* Add overflow: 'hidden' here */}
        <Typography variant="h5" gutterBottom>
          Persyaratan Kuliah Kerja Profesi
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer sx={{ overflow: 'hidden' }}> {/* Add overflow: 'hidden' here */}
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
                  <TableRow
                    key={item.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
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
                      <Button
                        size='small'
                        variant="contained"
                        startIcon={<i className="tabler-info-circle" />}
                        onClick={() => handleClickOpen(item)}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  )
}
