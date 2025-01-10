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
  MenuItem,
  Menu,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { format, subDays, subMonths } from 'date-fns';

import AnimationNotFound from '@components/DataNotFound'

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
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImageDialog = () => {
    setSelectedImage(null);
  };

  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filterData = (data) => {
    const now = new Date();

    if (filter === '7days') {
      return data.filter(activity => new Date(activity.date) >= subDays(now, 7));
    } else if (filter === 'month') {
      return data.filter(activity => new Date(activity.date) >= subMonths(now, 1));
    }


    return data;
  };

  const renderTimelineItems = () => {
    const filteredData = filterData(data);

    if (filteredData.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <AnimationNotFound text="Data tidak ditemukan" />
        </Box>
      );
    }

    return filteredData.map((activity, index) => {
      const isSameDateAsPrevious = index > 0 && filteredData[index - 1].date === activity.date;

      return (
        <React.Fragment key={index}>
          <TimelineItem>
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
          {!isSameDateAsPrevious && index > 0 && (
            <Divider sx={{ borderStyle: 'dashed', marginY: 2, width: '85%', marginX: 'auto' }} />
          )}
        </React.Fragment>
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
          <IconButton onClick={handleMenuClick}>
            <i className='tabler-align-left text-[22px]' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleFilterChange('7days')}>7 Hari lalu</MenuItem>
            <MenuItem onClick={() => handleFilterChange('month')}>Bulan lalu</MenuItem>
            <MenuItem onClick={() => handleFilterChange('all')}>Semua Kegiatan</MenuItem>
          </Menu>

        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Timeline>
          {renderTimelineItems()}
        </Timeline>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='error' variant='contained'>
          Kembali
        </Button>
        <Button onClick={onClose} color='success' variant='contained'>
          Print
        </Button>
      </DialogActions>

      <Dialog open={!!selectedImage} onClose={handleCloseImageDialog}>
        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
      </Dialog>
    </>
  );
};

export default KegiatanLaporan;
