import { Grid, Card, CardContent, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import CustomAvatar from '@core/components/mui/Avatar'

export default function ListInstansiKKP({ instansiApprovals, getRandomColor }) {
  return (
    <Grid container spacing={4}>
      {instansiApprovals.map((item, idx) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={idx}
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <Card
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{
              height: '100%', display: 'flex', flexDirection: 'column',
              boxShadow: 3, borderRadius: 2, overflow: 'hidden',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                  <CustomAvatar
                    color={getRandomColor()}
                    variant="rounded"
                    size={90}
                    skin="light"
                    sx={{ mb: 2 }}
                  >
                    <i className={item.kkpInstansi.logo} />
                  </CustomAvatar>
                </Grid>
                <Grid item>
                  <Chip
                    variant="outlined"
                    label={item.kkpInstansi.is_activated ? 'Terdaftar' : 'Tidak Aktif'}
                    color={item.kkpInstansi.is_activated ? 'success' : 'error'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item textAlign="center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {item.kkpInstansi.nama}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item.kkpInstansi.alamat}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.kkpInstansi.keterangan}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
