import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { Box, Button, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import AdminPanel from './AdminPanel';
import CollectorPanel from './CollectorPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/login');
      } else {
        // Check if role parameter exists in URL
        // User is authenticated, allow access to dashboard
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      p: 0
    }}>
      {/* Header Section */}
      <Box sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        p: 3,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}>
                🗑️ Waste Management System
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Efficient waste collection and monitoring platform
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 3,
                px: 3,
                py: 1,
                borderColor: '#ff6b6b',
                color: '#ff6b6b',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#ff5252',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              🚪 Logout
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ 
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Always show both dashboards with tabs */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              🗑️ Waste Management Dashboard
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Manage dustbins and monitor collection activities
            </Typography>
          </Box>
          
          {/* Tabs for both Admin and Collector views */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              sx={{ px: 2 }}
            >
              <Tab label="🗑️ Admin Panel" />
              <Tab label="🚛 Collector View" />
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
