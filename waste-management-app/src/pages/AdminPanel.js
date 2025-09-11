import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Alert,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationPicker from '../components/LocationPicker';

const AdminPanel = () => {
  const [dustbins, setDustbins] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: { lat: 12.9716, lng: 77.5946 },
    threshold: 80,
    currentFill: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [selectedDustbinForLocation, setSelectedDustbinForLocation] = useState(null);

  // Check Firebase configuration
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError('Firebase is not properly configured. Please check your environment variables.');
      setLoading(false);
    }
  }, []);

  // Load dustbins from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    
    try {
      const unsubscribe = onSnapshot(collection(db, 'dustbins'), (snapshot) => {
        const dustbinsData = [];
        snapshot.forEach((doc) => {
          dustbinsData.push({ id: doc.id, ...doc.data() });
        });
        setDustbins(dustbinsData);
        setLoading(false);
      }, (error) => {
        console.error('Error loading dustbins:', error);
        setError('Failed to load dustbins. Please check your Firebase configuration.');
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up listener:', error);
      setError('Failed to connect to Firebase. Please check your configuration.');
      setLoading(false);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditingId(null);
    setFormData({
      name: '',
      location: { lat: 12.9716, lng: 77.5946 },
      threshold: 80,
      currentFill: 0,
      status: 'Available'
    });
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThresholdChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      threshold: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      setError('Please enter a name for the dustbin');
      return;
    }

    try {
      if (editingId) {
        // Update existing dustbin
        await updateDoc(doc(db, 'dustbins', editingId), formData);
      } else {
        // Add new dustbin
        await addDoc(collection(db, 'dustbins'), formData);
      }
      handleClose();
    } catch (err) {
      console.error('Error saving dustbin:', err);
      setError('Failed to save dustbin. Please try again.');
    }
  };

  const handleEdit = (dustbin) => {
    setFormData(dustbin);
    setEditingId(dustbin.id);
    setOpen(true);
  };


  const handleAddLocation = (dustbinId) => {
    const dustbin = dustbins.find(d => d.id === dustbinId);
    setSelectedDustbinForLocation(dustbin);
    setLocationPickerOpen(true);
  };

  const handleLocationSelect = async (location) => {
    if (selectedDustbinForLocation) {
      try {
        const dustbinRef = doc(db, 'dustbins', selectedDustbinForLocation.id);
        await updateDoc(dustbinRef, {
          location: location
        });
        alert('Location updated successfully!');
      } catch (err) {
        console.error('Error updating location:', err);
        alert('Failed to update location. Please try again.');
      }
    }
  };

  const handleLocationPickerClose = () => {
    setLocationPickerOpen(false);
    setSelectedDustbinForLocation(null);
  };

  const handleFillChange = async (id, newFill) => {
    try {
      const dustbinRef = doc(db, 'dustbins', id);
      const dustbin = dustbins.find(d => d.id === id);
      await updateDoc(dustbinRef, {
        currentFill: newFill,
        status: newFill >= dustbin.threshold ? 'Full' : 'Available'
      });
    } catch (err) {
      console.error('Error updating fill level:', err);
    }
  };

  // Show threshold alerts
  const getThresholdAlerts = () => {
    return dustbins.filter(dustbin => dustbin.currentFill >= dustbin.threshold);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography>Loading dustbins...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        p: 4,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              🗑️ Dustbin Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monitor and manage waste collection points
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            onClick={handleOpen}
            size="large"
            sx={{ 
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            ➕ Add New Dustbin
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Threshold Alerts */}
        {getThresholdAlerts().length > 0 && (
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
              color: 'white',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              ⚠️ Urgent: Dustbins Need Attention!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {getThresholdAlerts().map(dustbin => (
                <Typography key={dustbin.id} variant="body2" sx={{ fontWeight: 500 }}>
                  🚨 {dustbin.name}: {dustbin.currentFill}% full (threshold: {dustbin.threshold}%)
                </Typography>
              ))}
            </Box>
          </Alert>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
        <Table>
          <TableHead sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>📝 Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>📍 Location</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>📊 Fill Level</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>⚠️ Threshold</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>🚦 Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>⚙️ Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dustbins.map((dustbin, index) => (
              <TableRow 
                key={dustbin.id}
                sx={{ 
                  '&:nth-of-type(odd)': { 
                    backgroundColor: 'rgba(102, 126, 234, 0.05)' 
                  },
                  '&:hover': { 
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    transform: 'scale(1.01)',
                    transition: 'all 0.2s ease'
                  },
                  borderLeft: `4px solid ${dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66'}`
                }}
              >
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  {dustbin.name}
                </TableCell>
                <TableCell>
                  {dustbin.location?.address ? (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<span>📍</span>}
                      onClick={() => handleAddLocation(dustbin.id)}
                      sx={{ 
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        borderRadius: 2,
                        borderColor: '#667eea',
                        color: '#667eea',
                        '&:hover': {
                          borderColor: '#5a6fd8',
                          backgroundColor: 'rgba(102, 126, 234, 0.1)'
                        }
                      }}
                    >
                      Edit Location
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<span>📍</span>}
                      onClick={() => handleAddLocation(dustbin.id)}
                      sx={{ 
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        borderRadius: 2,
                        borderColor: '#ff9a56',
                        color: '#ff9a56',
                        '&:hover': {
                          borderColor: '#ff8c42',
                          backgroundColor: 'rgba(255, 154, 86, 0.1)'
                        }
                      }}
                    >
                      Add Location
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Slider
                      value={dustbin.currentFill}
                      onChange={(e, newValue) => handleFillChange(dustbin.id, newValue)}
                      aria-labelledby="fill-level-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={0}
                      max={100}
                      sx={{ 
                        width: 120,
                        color: dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66',
                        '& .MuiSlider-thumb': {
                          backgroundColor: dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66'
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ 
                      fontWeight: 'bold',
                      color: dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66',
                      minWidth: '40px'
                    }}>
                      {dustbin.currentFill}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {dustbin.threshold}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    backgroundColor: dustbin.currentFill >= dustbin.threshold ? '#ffe0e0' : '#e0f7e0',
                    border: `1px solid ${dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66'}`
                  }}>
                    <span>{dustbin.currentFill >= dustbin.threshold ? '🔴' : '🟢'}</span>
                    <Typography variant="body2" sx={{
                      color: dustbin.currentFill >= dustbin.threshold ? '#c92a2a' : '#2b8a3e',
                      fontWeight: 'bold'
                    }}>
                      {dustbin.currentFill >= dustbin.threshold ? 'Full' : 'Available'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(dustbin);
                    }} 
                    sx={{
                      color: '#667eea',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                    title="Edit Dustbin"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Dustbin Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
            py: 3
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {editingId ? '✏️ Edit Dustbin' : '🗑️ Add New Dustbin'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1, color: '#2c3e50', fontWeight: 600 }}>
                  📝 Dustbin Details
                </Typography>
                <TextField
                  autoFocus
                  name="name"
                  label="Dustbin Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter a unique name for this dustbin"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: '#2c3e50', fontWeight: 600 }}>
                  ⚠️ Threshold Settings
                </Typography>
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'white', 
                  borderRadius: 2, 
                  border: '1px solid #e9ecef',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                    Fill Level Threshold: <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{formData.threshold}%</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Set the percentage at which this dustbin should be marked as "Full"
                  </Typography>
                  <Slider
                    value={formData.threshold}
                    onChange={handleThresholdChange}
                    aria-labelledby="threshold-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75%' },
                      { value: 100, label: '100%' }
                    ]}
                    min={0}
                    max={100}
                    sx={{ 
                      color: '#667eea',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#667eea',
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#667eea'
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e9ecef'
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, backgroundColor: '#f8f9fa', gap: 2 }}>
            <Button 
              onClick={handleClose} 
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1,
                borderColor: '#6c757d',
                color: '#6c757d',
                '&:hover': {
                  borderColor: '#5a6268',
                  backgroundColor: '#f8f9fa'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              {editingId ? '✏️ Update Dustbin' : '🗑️ Add Dustbin'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Location Picker Dialog */}
      <LocationPicker
        open={locationPickerOpen}
        onClose={handleLocationPickerClose}
        onLocationSelect={handleLocationSelect}
        dustbinName={selectedDustbinForLocation?.name || ''}
      />
    </Box>
  );
};

export default AdminPanel;
