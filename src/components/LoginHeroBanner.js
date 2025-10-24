import React, { useState } from 'react';
import { Box } from '@mui/material';

const LoginHeroBanner = () => {
  const [index, setIndex] = useState(0);
  const sources = ['/reearth-logo.jpeg', '/reearth-logo.png', '/reearth-logo.jpg', '/reearth-logo.webp'];

  const onError = () => {
    if (index < sources.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      borderRadius: 3,
      overflow: 'hidden',
      mb: 2,
      boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
    }}>
      <Box
        component="img"
        src={sources[index]}
        alt="reEarth banner"
        onError={onError}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto'
        }}
      />
    </Box>
  );
};

export default LoginHeroBanner;


