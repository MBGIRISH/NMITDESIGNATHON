import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Box, Button, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import AdminPanel from './AdminPanel';
import CollectorPanel from './CollectorPanel';
import BrandLogo from '../components/BrandLogo';
import HoverSound from '../components/HoverSound';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Demo mode - no authentication required
  useEffect(() => {
    // Allow access without authentication check
  }, [navigate]);

  const handleLogout = () => {
    // Simply redirect to login page (no actual logout needed in demo mode)
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #1b5e20 100%)',
      p: 0,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(81, 207, 102, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(129, 199, 132, 0.15) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      {/* Header Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 250, 240, 0.95))',
        backdropFilter: 'blur(10px)',
        p: 3,
        borderBottom: '3px solid rgba(81, 207, 102, 0.3)',
        position: 'relative',
        zIndex: 1,
        animation: 'slideDown 0.6s ease-out',
        boxShadow: '0 4px 20px rgba(45, 80, 22, 0.1)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, position: 'relative' }}>
              <BrandLogo size="medium" showTagline={false} />
              <Box>
                <Typography variant="h3" sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}>
                  ♻️ Waste Management System
                </Typography>
                <Typography variant="h6" sx={{ color: '#4a7c59' }}>
                  🌿 Efficient waste collection and monitoring platform
                </Typography>
              </Box>
            </Box>
            <HoverSound>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 3,
                px: 3,
                py: 1,
                borderColor: '#c62828',
                color: '#c62828',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent)',
                  transition: 'left 0.5s'
                },
                '&:hover': {
                  borderColor: '#ff5252',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  transform: 'scale(1.05) translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                  '&::before': {
                    left: '100%'
                  }
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Logout
            </Button>
            </HoverSound>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Paper sx={{ 
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeInUp 0.8s ease-out',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Live Operations Banner with big-bg.webp */}
          <Box sx={{
            position: 'relative',
            height: 220,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/big-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.35,
              filter: 'blur(0.5px)'
            }
          }}>
            <Box sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
              backdropFilter: 'blur(2px)'
            }}>
              <Typography variant="h3" sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(81,207,102,0.4)',
                mb: 1,
                letterSpacing: 1
              }}>
                Live Operations
              </Typography>
              <Typography variant="h6" sx={{
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontWeight: 500
              }}>
                🌍 Track bins and collections in real-time
              </Typography>
            </Box>
          </Box>

          {/* Decorative bins along top edge */}
          <Box sx={{
            position: 'absolute',
            top: -24,
            right: 24,
            display: 'flex',
            gap: 8,
            opacity: 0.9
          }}>
            {/* Simple SVG dustbin icons */}
            <Box component="svg" width={28} height={32} viewBox="0 0 24 24" fill="#2d5016">
              <path d="M7 7h10l-1 13H8L7 7Zm2-3h6l1 2H8l1-2Z"/>
            </Box>
            <Box component="svg" width={28} height={32} viewBox="0 0 24 24" fill="#4a7c59">
              <path d="M6 8h12l-1 12H7L6 8Zm3-3h6l1 2H8l1-2Z"/>
            </Box>
            <Box component="svg" width={28} height={32} viewBox="0 0 24 24" fill="#6fbf73">
              <path d="M5 9h14l-1 11H6L5 9Zm4-3h6l1 2H8l1-2Z"/>
            </Box>
          </Box>

          {/* Always show both dashboards with tabs */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
            color: 'white',
            p: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ♻️ Waste Management Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              🌿 Manage dustbins and monitor collection activities
            </Typography>
          </Box>
          
          {/* Tabs for both Admin and Collector views */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            backgroundColor: 'white',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(81, 207, 102, 0.3), transparent)'
            }
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              sx={{ 
                px: 2,
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(81, 207, 102, 0.1)',
                    transform: 'translateY(-1px)'
                  },
                  '&.Mui-selected': {
                    color: '#2e7d32',
                    transform: 'translateY(-1px)'
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '2px 2px 0 0',
                  background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)'
                }
              }}
            >
              <Tab label="Admin Panel" />
              <Tab label="Collector View" />
            </Tabs>
          </Box>
          
          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            {activeTab === 0 ? <AdminPanel /> : <CollectorPanel />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
