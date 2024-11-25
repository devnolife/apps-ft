import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
} from '@mui/material';

const DialogNotification = ({ open, onClose, dataDialog, inviterData, onAccept, onReject }) => {
  const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const badgeColor = getRandomColor();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajakan Bergabung KKP</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar src={inviterData.avatar} alt={inviterData.name} sx={{ width: 64, height: 64, mr: 2 }} />
          <Box>
            <Typography variant="h6">{inviterData.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {inviterData.prodi}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              NIM: {inviterData.nim}
            </Typography>
            <Box mt={1}>
              <Chip
                label={inviterData.position}
                color={badgeColor}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Mengundang Anda untuk bergabung dalam kelompok Kuliah Kerja Profesi.
        </Typography>

        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <img src={dataDialog.logo} alt="Logo" style={{ width: '80px', marginRight: '16px' }} />
              <Box>
                <Typography variant="h6">{dataDialog.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {dataDialog.address}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {dataDialog.keterangan}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject} color="error" variant="outlined">
          Tolak
        </Button>
        <Button onClick={onAccept} color="primary" variant="contained">
          Terima
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogNotification;
