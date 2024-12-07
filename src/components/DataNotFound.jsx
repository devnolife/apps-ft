import { Box, Typography } from '@mui/material';

const AnimationNotFound = ({ w, h, text, textStyle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: h || '100%',
        width: w || '100%',
      }}
    >
      <img src="/images/not-found.png" alt="Data not found" />
      <Typography
        sx={{
          ...textStyle,
          textAlign: 'center',
          color: 'gray.500',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          margin: '1rem 0',
        }}
      >
        {text || 'Data tidak ditemukan'}
      </Typography>
    </Box>
  );
};

export default AnimationNotFound;
