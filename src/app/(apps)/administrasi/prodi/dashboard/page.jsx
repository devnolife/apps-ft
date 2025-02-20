import Grid from '@mui/material/Grid'

import OverviewCard from './OverviewCard'

const Page = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <OverviewCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <h4> User List </h4>
      </Grid>
    </Grid>
  )
}

export default Page
