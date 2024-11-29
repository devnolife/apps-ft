import {
  Button, 
  DialogActions, 
  DialogContent,
  DialogTitle,

} from '@mui/material';

import DialogCloseButton from '@/components/dialogs/DialogCloseButton';

const KegiatanLaporan = ({ onClose }) => {
  return (
    <>
      <DialogTitle>Laporan Kegiatan</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='error'>
          Batal
        </Button>
        <Button onClick={onClose} color='primary'>
          Simpan
        </Button>
      </DialogActions>
    </>
  );
};

export default KegiatanLaporan;
