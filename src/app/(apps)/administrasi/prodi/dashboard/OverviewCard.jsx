import Grid from '@mui/material/Grid'


import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const data = [
  {
    title: 'Total Surat',
    stats: '1,234',
    avatarIcon: 'tabler-mail',
    avatarColor: 'primary',
    trend: 'positif',
    trendNumber: '20.1%',
    subtitle: 'dari bulan lalu'
  },
  {
    title: 'Tertunda',
    stats: '45',
    avatarIcon: 'tabler-clock',
    avatarColor: 'warning',
    trend: 'negatif',
    trendNumber: '2%',
    subtitle: 'dari bulan lalu'
  },
  {
    title: 'Disetujui',
    stats: '873',
    avatarIcon: 'tabler-check',
    avatarColor: 'success',
    trend: 'positif',
    trendNumber: '18.1%',
    subtitle: 'dari bulan lalu'
  },
  {
    title: 'Ditolak',
    stats: '23',
    avatarIcon: 'tabler-x',
    avatarColor: 'error',
    trend: 'positif',
    trendNumber: '4.1%',
    subtitle: 'dari bulan lalu'
  }
]

const UserListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
