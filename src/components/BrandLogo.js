import React, { useState } from 'react';
import { Box } from '@mui/material';
import ReEarthLogo from './ReEarthLogo';

const sizeToPx = {
  small: 120,
  medium: 180,
  large: 220,
  xlarge: 280
};

const BrandLogo = ({ size = 'xlarge', px, fit = 'contain', preferVector = false, showTagline = true }) => {
  const [useImage, setUseImage] = useState(true);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = ['/reearth-logo.jpeg', '/reearth-logo.png', '/reearth-logo.jpg', '/reearth-logo.webp'];
  const width = px || sizeToPx[size] || sizeToPx.xlarge;

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setUseImage(false);
    }
  };

  if (preferVector) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReEarthLogo size={size} showTagline={showTagline} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {useImage ? (
        <Box
          sx={{
            width,
            height: width,
            position: 'relative',
            background: 'transparent'
          }}
        >
          <Box
            component="img"
            src={sources[srcIndex]}
            alt="reEarth Logo"
            onError={handleError}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: fit,
              background: 'transparent',
              userSelect: 'none'
            }}
          />
        </Box>
      ) : (
        <ReEarthLogo size={size} showTagline={showTagline} />
      )}
    </Box>
  );
};

export default BrandLogo;


