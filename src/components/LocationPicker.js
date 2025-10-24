import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField
} from '@mui/material';

const LocationPicker = ({ open, onClose, onLocationSelect, dustbinName }) => {
  const [address, setAddress] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  const handleSetLocation = () => {
    if (address.trim() && googleMapsLink.trim()) {
      // Validate Google Maps link format
      if (googleMapsLink.includes('maps.google.com') || googleMapsLink.includes('maps.app.goo.gl') || googleMapsLink.includes('goo.gl/maps')) {
        onLocationSelect({
          address: address.trim(),
          googleMapsLink: googleMapsLink.trim()
        });
        handleClose();
      } else {
        alert('Please enter a valid Google Maps link.\nExample: https://maps.app.goo.gl/MjNYV869YhysVgjR9');
      }
    } else {
      alert('Please fill in both the address and Google Maps link fields.');
    }
  };

  const handleClose = () => {
    setAddress('');
    setGoogleMapsLink('');
    onClose();
  };

  useEffect(() => {
    if (open) {
      setAddress('');
      setGoogleMapsLink('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Set Location for {dustbinName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Enter the address and Google Maps link for this dustbin location.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Dustbin Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the full address (e.g., 123 Main Street, City, State)"
            multiline
            rows={2}
            fullWidth
            helperText="Provide a clear, detailed address for the dustbin location"
          />
          
          <TextField
            label="Google Maps Link"
            value={googleMapsLink}
            onChange={(e) => setGoogleMapsLink(e.target.value)}
            placeholder="https://maps.app.goo.gl/MjNYV869YhysVgjR9"
            fullWidth
            helperText="Paste the Google Maps share link here"
          />
          
          <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              How to get Google Maps link:
            </Typography>
            <Typography variant="body2" component="div">
              1. Open <Button 
                   variant="text" 
                   size="small" 
                   onClick={() => window.open('https://maps.google.com/', '_blank')}
                 >
                   Google Maps
                 </Button> in a new tab<br/>
              2. Search for or navigate to the dustbin location<br/>
              3. Click the "Share" button<br/>
              4. Copy the link and paste it above<br/>
              5. Fill in the address details
            </Typography>
          </Box>
          
          {address && googleMapsLink && (
            <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Location Preview:</strong><br/>
                Address: {address}<br/>
                Link: {googleMapsLink}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSetLocation} 
          variant="contained"
          disabled={!address.trim() || !googleMapsLink.trim()}
        >
          Set This Location
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationPicker;
