import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import NeonOrbsCanvas from '../components/NeonOrbsCanvas';
import HoverSound from '../components/HoverSound';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (window.gsap && heroRef.current && formRef.current) {
      const gsap = window.gsap;
      
      // Hero reveal animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 0.92, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Form inputs stagger reveal
      const inputs = formRef.current.querySelectorAll('[data-reveal]');
      gsap.fromTo(
        inputs,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.4, ease: 'power2.out' }
      );

      // Camera pan on scroll
      if (gsap.ScrollTrigger) {
        gsap.to(heroRef.current, {
          y: -30,
          rotateX: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Demo mode - allow any name/email/password to sign up (like Figma)
    if (!name || !email || !password) {
      return setError('Please fill in all fields');
    }

    setError('');
    setLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0e1a 0%, #1a1f35 50%, #0f1422 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      {/* Animated neon background */}
      <Box sx={{ position: 'fixed', inset: 0, opacity: 0.6 }}>
        <NeonOrbsCanvas density={32} />
      </Box>

      {/* Radial neon glow */}
      <Box sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle 800px at 50% 20%, rgba(102,126,234,0.25), transparent), radial-gradient(circle 600px at 20% 80%, rgba(118,75,162,0.2), transparent)',
      }} />

      {/* Spline 3D background */}
      <Box sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.4,
        filter: 'blur(1px)'
      }}>
        <iframe
          title="spline-bg-signup"
          src="https://my.spline.design/abstractcube-9df0c8f3b3c0f4f9c3b9a0-embedded"
          style={{ width: '100%', height: '100%', border: 'none' }}
          loading="lazy"
        />
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          ref={heroRef}
          sx={{
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Glassmorphism Card */}
          <Box sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.6), inset 0 0 80px rgba(102, 126, 234, 0.1)',
            position: 'relative'
          }}>
            {/* Cinematic headline */}
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Space Grotesk, Poppins, system-ui, sans-serif',
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 800,
                color: 'white',
                textAlign: 'center',
                mb: 1,
                textShadow: '0 0 40px rgba(102,126,234,0.8), 0 0 20px rgba(118,75,162,0.6)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                animation: 'floatY 5s ease-in-out infinite'
              }}
            >
              Join reEarth
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(200, 220, 255, 0.85)',
                textAlign: 'center',
                mb: 1,
                fontWeight: 400
              }}
            >
              Create your account to start contributing
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: 'Space Grotesk, system-ui, sans-serif',
                color: 'rgba(130, 200, 160, 0.9)',
                textAlign: 'center',
                mb: 4,
                fontWeight: 600,
                animation: 'floatY 6s ease-in-out infinite'
              }}
            >
              Rethink. Reduce. Recycle.
            </Typography>

            {/* Demo Mode Info */}
            <Alert
              severity="info"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(102, 126, 234, 0.15)',
                color: 'rgba(150, 200, 255, 0.95)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                backdropFilter: 'blur(10px)',
                '& .MuiAlert-icon': {
                  color: 'rgba(150, 200, 255, 0.95)'
                }
              }}
            >
              <strong>Demo Mode:</strong> Enter any details to create an account
            </Alert>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  backgroundColor: 'rgba(211, 47, 47, 0.15)',
                  color: '#ff6b6b',
                  border: '1px solid rgba(211, 47, 47, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }} ref={formRef}>
              <TextField
                data-reveal
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)'
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(200, 220, 255, 0.7)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  },
                }}
              />

              <TextField
                data-reveal
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)'
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(200, 220, 255, 0.7)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  },
                }}
              />

              <TextField
                data-reveal
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(102, 126, 234, 0.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)'
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(200, 220, 255, 0.7)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  },
                }}
              />

              <HoverSound>
                <Button
                  data-reveal
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    fontFamily: 'Space Grotesk, system-ui, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(102, 126, 234, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 0 60px rgba(102, 126, 234, 0.7), 0 15px 40px rgba(0, 0, 0, 0.4)',
                      '&::before': {
                        transform: 'translateX(100%)',
                      },
                    },
                    '&:disabled': {
                      background: 'rgba(100, 100, 120, 0.3)',
                      color: 'rgba(255, 255, 255, 0.4)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      Creating Account
                    </Box>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </HoverSound>

              <Box data-reveal sx={{ textAlign: 'center', mt: 3 }}>
                <Link
                  to="/login"
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#9fa8ff';
                    e.target.style.textShadow = '0 0 20px rgba(102,126,234,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
