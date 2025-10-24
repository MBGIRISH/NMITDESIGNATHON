import React from 'react';
import { Box, Typography } from '@mui/material';

const ReEarthLogo = ({ size = 'large', showTagline = true }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { width: 140, height: 140 },
          circle: { width: 120, height: 120 },
          mainText: { fontSize: '1.6rem', fontWeight: 'bold' },
          tagline: { fontSize: '0.8rem' },
          bin: { width: 24, height: 30 },
          leaf: { width: 18, height: 24 },
          borderWidth: 3,
          textOffset: 8
        };
      case 'xlarge':
        return {
          container: { width: 320, height: 320 },
          circle: { width: 280, height: 280 },
          mainText: { fontSize: '3.2rem', fontWeight: 'bold' },
          tagline: { fontSize: '1.2rem' },
          bin: { width: 60, height: 72 },
          leaf: { width: 40, height: 56 },
          borderWidth: 8,
          textOffset: 22
        };
      case 'large':
        return {
          container: { width: 240, height: 240 },
          circle: { width: 200, height: 200 },
          mainText: { fontSize: '2.6rem', fontWeight: 'bold' },
          tagline: { fontSize: '1rem' },
          bin: { width: 44, height: 54 },
          leaf: { width: 28, height: 40 },
          borderWidth: 6,
          textOffset: 16
        };
      default: // medium
        return {
          container: { width: 180, height: 180 },
          circle: { width: 160, height: 160 },
          mainText: { fontSize: '2rem', fontWeight: 'bold' },
          tagline: { fontSize: '0.9rem' },
          bin: { width: 32, height: 40 },
          leaf: { width: 22, height: 30 },
          borderWidth: 4,
          textOffset: 12
        };
    }
  };

  const styles = getSizeStyles();
  const leafOffset = -Math.round(styles.leaf.width * 0.6);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      position: 'relative',
      ...styles.container
    }}>
      {/* Main Logo Container */}
      <Box sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...styles.circle
      }}>
        {/* Green Circle Background */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `${styles.borderWidth}px solid #2d5016`,
          backgroundColor: 'transparent',
          zIndex: 1
        }} />
        
        {/* Left Leaf */}
        <Box sx={{
          position: 'absolute',
          left: leafOffset,
          top: '50%',
          transform: 'translateY(-50%)',
          width: styles.leaf.width,
          height: styles.leaf.height,
          backgroundColor: '#4a7c59',
          borderRadius: '50% 0 50% 0',
          zIndex: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }} />
        
        {/* Right Leaf */}
        <Box sx={{
          position: 'absolute',
          right: leafOffset,
          top: '50%',
          transform: 'translateY(-50%)',
          width: styles.leaf.width,
          height: styles.leaf.height,
          backgroundColor: '#4a7c59',
          borderRadius: '0 50% 0 50%',
          zIndex: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }} />
        
        {/* Recycling Bins (top center) */}
        <Box sx={{
          position: 'absolute',
          top: styles.borderWidth + 6,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}>
          {/* Main Bin */}
          <Box sx={{
            width: styles.bin.width,
            height: styles.bin.height,
            backgroundColor: '#2d5016',
            borderRadius: '2px 2px 0 0',
            position: 'relative'
          }} />
          
          {/* Smaller Bin (shadow bin) */}
          <Box sx={{
            position: 'absolute',
            top: Math.round(styles.bin.height * 0.25),
            right: -Math.round(styles.bin.width * 0.35),
            width: Math.round(styles.bin.width * 0.7),
            height: Math.round(styles.bin.height * 0.7),
            backgroundColor: '#4a7c59',
            borderRadius: '2px 2px 0 0',
            opacity: 0.9
          }} />
        </Box>
        
        {/* Main Text */}
        <Box sx={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          mt: `${styles.textOffset}px`
        }}>
          <Typography sx={{
            color: '#2d5016',
            fontFamily: 'serif',
            ...styles.mainText,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center'
          }}>
            <Box component="span" sx={{ fontSize: '0.6em', mr: 0.5 }}>re</Box>
            <Box component="span" sx={{ fontWeight: 'bold' }}>Earth</Box>
          </Typography>
        </Box>
      </Box>

      {/* Tagline (below the circle for better visibility) */}
      {showTagline && (
        <Typography sx={{
          color: '#1a3009',
          fontFamily: 'serif',
          ...styles.tagline,
          fontWeight: 'normal',
          lineHeight: 1.2,
          mt: 1.5,
          textAlign: 'center'
        }}>
          Rethink. Reduce. Recycle.
        </Typography>
      )}
    </Box>
  );
};

export default ReEarthLogo;
