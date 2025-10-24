import React from 'react';
import { Box, Typography } from '@mui/material';

const Floating = ({ delay = 0, children }) => (
  <Box sx={{
    animation: `heroFloat 6s ease-in-out ${delay}s infinite`,
    willChange: 'transform'
  }}>
    {children}
  </Box>
);

const HeroIllustration = ({ height = 220, title, subtitle }) => {
  return (
    <Box sx={{
      width: '100%',
      height,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15))',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)',
      mb: 3
    }}>
      {/* Background waves */}
      <Box sx={{
        position: 'absolute',
        left: -50,
        bottom: -20,
        width: '60%',
        height: 120,
        borderRadius: '60% 40% 0 0',
        background: 'rgba(102,126,234,0.18)'
      }} />
      <Box sx={{
        position: 'absolute',
        right: -40,
        bottom: -10,
        width: '50%',
        height: 100,
        borderRadius: '40% 60% 0 0',
        background: 'rgba(118,75,162,0.18)'
      }} />

      {/* Floating icons */}
      <Floating delay={0}>
        <Box component="svg" viewBox="0 0 24 24" width={64} height={64} fill="#2d5016" sx={{ position: 'absolute', top: 28, left: 24 }}>
          <path d="M7 7h10l-1 13H8L7 7Zm2-3h6l1 2H8l1-2Z" />
        </Box>
      </Floating>
      <Floating delay={1.2}>
        <Box component="svg" viewBox="0 0 24 24" width={52} height={52} fill="#4a7c59" sx={{ position: 'absolute', top: 36, right: 36 }}>
          <path d="M6 8h12l-1 12H7L6 8Zm3-3h6l1 2H8l1-2Z" />
        </Box>
      </Floating>
      <Floating delay={0.6}>
        <Box component="svg" viewBox="0 0 24 24" width={46} height={46} fill="#6fbf73" sx={{ position: 'absolute', top: 88, left: '45%' }}>
          <path d="M5 9h14l-1 11H6L5 9Zm4-3h6l1 2H8l1-2Z" />
        </Box>
      </Floating>
      <Floating delay={1.8}>
        <Box component="svg" viewBox="0 0 24 24" width={38} height={38} fill="#1b5e20" sx={{ position: 'absolute', top: 120, left: 80 }}>
          <circle cx="12" cy="12" r="10" fill="rgba(27,94,32,0.06)" />
          <path d="M12 6l3 4h-2v5h-2V10H9l3-4z" fill="#1b5e20" />
        </Box>
      </Floating>

      {/* Headings */}
      {(title || subtitle) && (
        <Box sx={{ position: 'absolute', bottom: 16, left: 24 }}>
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3009' }}>{title}</Typography>
          )}
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'rgba(26,48,9,0.8)' }}>{subtitle}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HeroIllustration;


