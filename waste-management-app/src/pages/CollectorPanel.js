import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { 
  Box, 
  Typography, 
  Paper, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CollectorPanel = () => {
  const [dustbins, setDustbins] = useState([]);
  const [selectedDustbin, setSelectedDustbin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [faqs] = useState([
    {
      question: 'How do I update the fill level of a dustbin in the system?',
      answer: 'To update the fill level, locate the dustbin in the table and use the horizontal slider control next to it. Simply drag the slider to match the current fill percentage you observe. The system will automatically update the status to "Full" if it exceeds the threshold, and "Available" if it\'s below the threshold. This real-time update helps maintain accurate monitoring across the entire waste management network.'
    },
    {
      question: 'What does the status indicator mean and how should I interpret it?',
      answer: 'The status indicator shows the current state of each dustbin: "Available" means the dustbin is below its fill threshold and has capacity for more waste, while "Full" indicates the dustbin has reached or exceeded its threshold and requires immediate attention for emptying. The color coding (green for Available, red for Full) provides quick visual identification during your collection rounds.'
    },
    {
      question: 'How frequently should I check and update dustbin levels?',
      answer: 'Dustbin levels should be checked and updated at least twice daily during peak hours (morning and evening) and whenever you\'re in the vicinity for collection or maintenance. Regular monitoring helps prevent overflow situations and ensures efficient route planning. High-traffic areas may require more frequent checks, while residential areas might need less frequent monitoring depending on usage patterns.'
    },
    {
      question: 'What is the proper procedure if I encounter a damaged dustbin?',
      answer: 'If you discover a damaged dustbin (cracked, broken lid, structural damage, etc.), immediately report it to the admin through the system or direct communication. Document the type and extent of damage, take photos if possible, and temporarily mark the dustbin as out of service. Do not attempt repairs yourself unless specifically trained and authorized. Prompt reporting ensures quick replacement or repair, maintaining service quality for the community.'
    },
    {
      question: 'How do I prioritize which dustbins to empty during my collection route?',
      answer: 'Prioritize dustbins based on their fill percentage and status: start with those marked "Full" (red status), then proceed to those with high fill percentages (above 70-80%). Consider geographical efficiency by planning routes that minimize travel time between locations. Use the "View on Map" buttons to optimize your route planning. Emergency situations (overflowing or complaints) should always take priority over routine collections.'
    },
    {
      question: 'What should I do if the system shows incorrect fill levels?',
      answer: 'If you notice discrepancies between the system readings and actual dustbin levels, first verify the physical fill level, then update the system using the slider to reflect the correct percentage. This helps maintain data accuracy for future planning. If you consistently notice incorrect readings for specific dustbins, report this to the admin as it may indicate a need for system calibration or sensor maintenance.'
    },
    {
      question: 'How can I use the location features effectively during collections?',
      answer: 'Use the "View on Map" buttons to get precise directions to each dustbin location. This is especially helpful for new collectors or when covering unfamiliar routes. The map integration helps you plan efficient collection paths, locate dustbins in complex areas like large buildings or parks, and provides backup navigation if your primary GPS fails. Always verify the physical location matches the system data.'
    },
    {
      question: 'What information should I communicate back to the admin team?',
      answer: 'Regularly communicate important observations including: unusual fill patterns that might indicate increased usage, accessibility issues at collection points, community feedback or complaints, equipment malfunctions, safety hazards around dustbin locations, and suggestions for optimizing collection schedules or routes. This feedback helps improve overall system efficiency and service quality.'
    }
  ]);

  // Load dustbins from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError('Firebase is not properly configured. Please check your environment variables.');
      setLoading(false);
      return;
    }
    
    try {
      const unsubscribe = onSnapshot(collection(db, 'dustbins'), (snapshot) => {
        const dustbinsData = [];
        snapshot.forEach((doc) => {
          dustbinsData.push({ id: doc.id, ...doc.data() });
        });
        setDustbins(dustbinsData);
        setLoading(false);
        
        // Select the first dustbin by default only if no dustbin is selected
        if (dustbinsData.length > 0 && !selectedDustbin) {
          setSelectedDustbin(dustbinsData[0]);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
              background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              🚛 Collection Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monitor dustbin levels and update collection status
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        <Paper sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold',
            color: '#2d3748',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            📋 Active Dustbins
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Click on any dustbin to view details and update fill levels
          </Typography>

          {/* Dustbin Grid */}
          <Grid container spacing={3}>
            {dustbins.map((dustbin) => (
              <Grid item xs={12} sm={6} md={4} key={dustbin.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: selectedDustbin?.id === dustbin.id ? '2px solid #51cf66' : '2px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  onClick={() => setSelectedDustbin(dustbin)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2d3748' }}>
                        🗑️ {dustbin.name}
                      </Typography>
                      <Box sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 20,
                        backgroundColor: dustbin.currentFill >= dustbin.threshold ? '#ffe0e0' : '#e0f7e0',
                        border: `1px solid ${dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66'}`
                      }}>
                        <Typography variant="caption" sx={{
                          color: dustbin.currentFill >= dustbin.threshold ? '#c92a2a' : '#2b8a3e',
                          fontWeight: 'bold'
                        }}>
                          {dustbin.currentFill >= dustbin.threshold ? '🔴 Full' : '🟢 Available'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Fill Level: <strong>{dustbin.currentFill}%</strong>
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={dustbin.currentFill} 
                        sx={{ 
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#e9ecef',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: dustbin.currentFill >= dustbin.threshold ? '#ff6b6b' : '#51cf66',
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Threshold: <strong>{dustbin.threshold}%</strong>
                    </Typography>

                    {dustbin.location && (dustbin.location.address || dustbin.location.googleMapsLink || dustbin.location.mapsLink) ? (
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        startIcon={<span>📍</span>}
                        onClick={(e) => {
                          e.stopPropagation();
                          const mapsLink = dustbin.location?.googleMapsLink || dustbin.location?.mapsLink;
                          if (mapsLink) {
                            window.open(mapsLink, '_blank');
                          } else if (dustbin.location?.lat && dustbin.location?.lng) {
                            // Fallback to Google Maps with coordinates
                            const fallbackLink = `https://www.google.com/maps?q=${dustbin.location.lat},${dustbin.location.lng}`;
                            window.open(fallbackLink, '_blank');
                          }
                        }}
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#51cf66',
                          color: '#51cf66',
                          '&:hover': {
                            borderColor: '#40c057',
                            backgroundColor: 'rgba(81, 207, 102, 0.1)'
                          }
                        }}
                      >
                        View Location
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        startIcon={<span>⚠️</span>}
                        disabled
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#ff9800',
                          color: '#ff9800',
                          fontSize: '0.75rem'
                        }}
                      >
                        Location Not Set
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* FAQ Section */}
        <Paper sx={{ 
          p: 3,
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold',
            color: '#2d3748',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            ❓ Frequently Asked Questions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Common questions about waste collection procedures
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ 
              mb: 1,
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: 'rgba(81, 207, 102, 0.1)',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
              >
                <Typography fontWeight="bold" sx={{ color: '#2d3748' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#f8f9fa' }}>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default CollectorPanel;
