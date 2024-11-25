// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

const CardStatHorizontal = props => {
  // Props
  const { stats, avatarIcon, avatarColor, title, avatarSkin, avatarSize } = props

  return (
    <Card className='bs-full'>
      <CardContent>
        <div className='flex items-center flex-wrap gap-2 justify-between'>
          <div className='flex flex-col gap-x-4 gap-y-0.5'>
            <Typography variant='h5'>{stats}</Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              {title}
            </Typography>
          </div>
          <CustomAvatar variant='rounded' color={avatarColor} skin={avatarSkin} size={avatarSize}>
            <i className={classnames(avatarIcon, 'text-[26px]')} />
          </CustomAvatar>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatHorizontal
