// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

const HorizontalWithAvatar = props => {
  // Props
  const { stats, title, avatarIcon, avatarColor, avatarVariant, avatarSkin, avatarSize } = props

  return (
    <Card>
      <CardContent className='flex items-center justify-between gap-2'>
        <div className='flex flex-col items-start gap-1'>
          <Typography variant='h5'>{stats}</Typography>
          <Typography variant='body2'>{title}</Typography>
        </div>
        <CustomAvatar variant={avatarVariant} skin={avatarSkin} color={avatarColor} size={avatarSize}>
          <i className={avatarIcon} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default HorizontalWithAvatar
