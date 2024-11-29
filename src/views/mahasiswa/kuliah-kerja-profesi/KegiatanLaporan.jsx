import React, { useState } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Box,
  Typography,
  Avatar,
  Dialog,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none',
    },
  },
});

const generateRandomColor = () => {
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];


  return colors[Math.floor(Math.random() * colors.length)];
};

const KegiatanLaporan = ({ onClose, data }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  const renderTimelineItems = () => {
    return data.map((activity, index) => {
      const isSameDateAsPrevious = index > 0 && data[index - 1].date === activity.date;

      return (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={generateRandomColor()} />
            {!isSameDateAsPrevious && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <div className='flex items-center justify-between flex-wrap gap-x-4 pbe-[7px]'>
              <Typography className='font-medium text-textPrimary' sx={{ fontSize: '1.1rem' }}>{activity.date}</Typography>
              <Typography variant='caption'>{activity.time}</Typography>
            </div>
            <div className='flex justify-between' style={{ marginTop: '8px' }}>
              <div style={{ flex: 1 }}>
                <Typography variant='body2' color='textSecondary'>
                  {activity.location}
                </Typography>
                {activity.description && (
                  <Typography
                    variant='body2'
                    sx={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '1rem' }}
                  >
                    {activity.description}
                  </Typography>
                )}
                <div className='flex items-center gap-2.5' style={{ marginTop: '8px' }}>
                  <Avatar src={activity.avatar} />
                  <div>
                    <Typography className='font-medium' variant='body2'>
                      {activity.name}
                    </Typography>
                    <Typography variant='body2'>{activity.role}</Typography>
                  </div>
                </div>
              </div>
              {activity.image && (
                <div className='flex flex-col justify-between' style={{ marginTop: '8px', flexShrink: 0, height: '100%' }}>
                  <div style={{ flexGrow: 1 }}></div>
                  <Avatar
                    alt={activity.imageAlt}
                    src={activity.image}
                    sx={{ width: 150, height: 150, borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => handleImageClick(activity.image)}
                  />
                </div>
              )}
            </div>
          </TimelineContent>
        </TimelineItem>
      );
    });
  };

  return (
    <>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <i className='tabler-align-left text-[22px]' />
            <Typography variant="h5" sx={{ ml: 4 }}>
              Aktivitas Kuliah Kerja Profesi
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <i className='tabler-x text-[22px]' />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Timeline>
          {renderTimelineItems()}
        </Timeline>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='error'>
          Batal
        </Button>
        <Button onClick={onClose} color='primary'>
          Simpan
        </Button>
      </DialogActions>

      <Dialog open={!!selectedImage} onClose={handleCloseImageDialog}>
        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
      </Dialog>
    </>
  );
};

export default KegiatanLaporan;
