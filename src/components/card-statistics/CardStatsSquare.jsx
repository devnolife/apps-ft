// MUI imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const CardStatsSquare = props => {
  // Props
  const { avatarColor, avatarIcon, stats, statsTitle, avatarVariant, avatarSize, avatarSkin } = props

  return (
    <Card>
      <CardContent className='flex flex-col items-center gap-2'>
        <CustomAvatar color={avatarColor} skin={avatarSkin} variant={avatarVariant} size={avatarSize}>
          <i className={avatarIcon} />
        </CustomAvatar>
        <div className='flex flex-col items-center gap-1'>
          <Typography variant='h5'>{stats}</Typography>
          <Typography color='text.secondary'>{statsTitle}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatsSquare
