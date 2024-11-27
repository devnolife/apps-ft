import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import classnames from 'classnames'

import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

import { useImageVariant } from '@core/hooks/useImageVariant'

const SearchHeader = ({ searchValue, setSearchValue }) => {
  const lightIllustration = '/images/apps/academy/hand-with-bulb-light.png'
  const darkIllustration = '/images/apps/academy/hand-with-bulb-dark.png'
  const theme = useTheme()
  const leftIllustration = useImageVariant(lightIllustration, darkIllustration)

  return (
    <Card className='relative flex justify-center'>
      <img src={leftIllustration} className='max-md:hidden absolute max-is-[100px] top-12 start-12' />
      <div className='flex flex-col items-center gap-4 max-md:pli-5 plb-12 md:is-1/2'>
        <Typography variant='h4' className='text-center md:is-3/4'>
          <span className='text-primary'>Laboratorium atau Pratikum</span> mendukung pembelajaran Anda di semester ini!
        </Typography>
        <Typography className='text-center'>
          Jelajahi berbagai pilihan lab yang dirancang untuk memperkaya pengetahuan Anda. Sesuaikan jadwal dan pilih lab yang sesuai dengan tujuan akademik Anda.
        </Typography>
        <div className='flex items-center gap-4 max-sm:is-full'>
          <CustomTextField
            placeholder='Pencarian ...'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className='sm:is-[350px] max-sm:flex-1'
          />
          <CustomIconButton variant='contained' color='primary'>
            <i className='tabler-search' />
          </CustomIconButton>
        </div>
      </div>
      <img
        src='/images/apps/academy/9.png'
        className={classnames('max-md:hidden absolute max-bs-[180px] bottom-0 end-0', {
          'scale-x-[-1]': theme.direction === 'rtl'
        })}
      />
    </Card>
  )
}

export default SearchHeader
