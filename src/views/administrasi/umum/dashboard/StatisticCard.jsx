import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import CustomAvatar from '@core/components/mui/Avatar'

const StatisticCardSurat = ({ dataSurat }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardHeader
        title='Statistik Administrasi dan Persuratan'
        action={
          <Typography variant='subtitle2' color='text.disabled'>
            Diperbarui 1 bulan yang lalu
          </Typography>
        }
      />
      <CardContent className='flex items-center justify-center'>
        <Grid container spacing={4} justifyContent='center'>
          {dataSurat.map((item, index) => (
            <Grid item xs={6} md={3} key={index} className='flex items-center gap-4'>
              <CustomAvatar color={item.color} variant='rounded' size={40} skin='light'>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography variant='body2'>{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticCardSurat
