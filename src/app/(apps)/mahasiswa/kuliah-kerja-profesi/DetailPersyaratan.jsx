import React from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material'

export default function DetailPersyaratan({ open, handleClose, selectedDetail, handleFileUpload }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Detail Persyaratan</DialogTitle>
      <DialogContent>
        {selectedDetail && (
          <>
            <Typography variant="h6">{selectedDetail.nama}</Typography>
            <Typography variant="body2">Status: {selectedDetail.aktif}</Typography>
            <Typography variant="body2">Upload File: {selectedDetail.file}</Typography>
            {selectedDetail.is_upload_file && selectedDetail.file === 'Tidak' && (
              <TextField
                type="file"
                onChange={handleFileUpload}
                fullWidth
                margin="normal"
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
