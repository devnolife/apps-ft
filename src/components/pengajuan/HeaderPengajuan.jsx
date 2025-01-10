// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const HeaderPengajuan = ({ textHeader, subHeader, onCancel, onSave }) => {
  return (
    <div className='flex flex-wrap justify-between gap-6 sm:items-center max-sm:flex-col'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {textHeader}
        </Typography>
        <Typography>{subHeader}</Typography>
      </div>
      <div className='flex flex-wrap gap-4 max-sm:flex-col'>
        <Button onClick={onCancel}
          variant='tonals' color='error'>
          Batalkan
        </Button>
        <Button onClick={onSave}
          variant='tonals'>Simpan</Button>
      </div>
    </div>
  )
}

export default HeaderPengajuan
