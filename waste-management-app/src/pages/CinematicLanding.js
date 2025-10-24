import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NeonOrbsCanvas from '../components/NeonOrbsCanvas';
import HoverSound from '../components/HoverSound';

const CinematicLanding = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP-based intro if available
    if (window.gsap) {
      const gsap = window.gsap;
      if (gsap && heroRef.current) {
        gsap.set(heroRef.current.querySelectorAll('[data-reveal]'), { opacity: 0, y: 20 });
        gsap.to(heroRef.current.querySelectorAll('[data-reveal]'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
      if (gsap && gsap.ScrollTrigger) {
        document.querySelectorAll('[data-pan-section]').forEach((el, i) => {
          gsap.fromTo(el, { yPercent: 10, opacity: 0 }, {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%'
            }
          });
        });
      }
    }

    const handler = () => {
      const layers = document.querySelectorAll('[data-parallax]');
      const y = window.scrollY;
      layers.forEach((el) => {
        const depth = Number(el.getAttribute('data-depth') || 0.2);
        el.style.transform = `translate3d(0, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      color: 'white',
      backgroundColor: '#0b0f1a',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Neon gradient ambient */}
      <Box sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(800px 400px at 20% 10%, rgba(102,126,234,0.25), transparent), radial-gradient(800px 400px at 80% 20%, rgba(118,75,162,0.25), transparent), radial-gradient(1000px 600px at 50% 120%, rgba(102,126,234,0.15), transparent)'
      }} />

      {/* Hero */}
      <Box sx={{ position: 'relative', zIndex: 1 }} ref={heroRef}>
        <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
          <Box sx={{ position: 'relative', height: { xs: 420, md: 560 }, perspective: '1200px' }}>
            <NeonOrbsCanvas />
            {/* 3D abstract layers */}
            {/* Spline embed for interactive 3D (waste machine / earth) */}
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
              <iframe
                title="spline-3d"
                src="https://my.spline.design/abstractcube-9df0c8f3b3c0f4f9c3b9a0-embedded" 
                style={{ width: '100%', height: '100%', border: 'none', opacity: 0.6 }}
                loading="lazy"
              />
            </Box>

            <Box data-parallax data-depth={0.15} sx={{
              position: 'absolute',
              top: '10%', left: '5%', width: 220, height: 220,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.5), rgba(118,75,162,0.5))',
              borderRadius: '24px',
              filter: 'blur(2px)',
              transform: 'translateZ(40px) rotateX(12deg) rotateY(-8deg)',
              boxShadow: '0 40px 120px rgba(102,126,234,0.35), inset 0 0 60px rgba(255,255,255,0.05)'
            }} />
            <Box data-parallax data-depth={0.25} sx={{
              position: 'absolute',
              top: '20%', right: '3%', width: 260, height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(118,75,162,0.6), rgba(20,24,38,0.2))',
              boxShadow: '0 60px 160px rgba(118,75,162,0.35)'
            }} />
            <Box data-parallax data-depth={0.35} sx={{
              position: 'absolute',
              bottom: '-6%', left: '20%', width: 520, height: 520,
              borderRadius: '50%',
              background: 'conic-gradient(from 120deg at 50% 50%, rgba(102,126,234,0.2), rgba(118,75,162,0.45), rgba(102,126,234,0.2))',
              filter: 'blur(18px)',
              opacity: 0.9
            }} />

            {/* Floating headline */}
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', mt: 6 }}>
              <Typography data-reveal variant="h1" sx={{
                fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif',
                fontSize: { xs: '2.4rem', md: '4.2rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                textShadow: '0 10px 40px rgba(0,0,0,0.5)',
                animation: 'floatY 6s ease-in-out infinite'
              }}>
                Where AI meets Imagination
              </Typography>
              <Typography data-reveal variant="h5" sx={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(220,230,255,0.8)',
                mt: 2,
                maxWidth: 820,
                mx: 'auto'
              }}>
                Build cinematic experiences with AI-driven creativity. Minimal. Futuristic. Storytelling.
              </Typography>

              {/* Glass CTA */}
              <Box data-reveal sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 5 }}>
                <HoverSound>
                  <Button onClick={() => navigate('/login')} variant="contained" sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    backdropFilter: 'blur(12px)',
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8))',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    boxShadow: '0 20px 60px rgba(102,126,234,0.35), inset 0 0 20px rgba(255,255,255,0.08)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102,126,234,1), rgba(118,75,162,1))',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    Sign In
                  </Button>
                </HoverSound>
                <HoverSound>
                  <Button onClick={() => navigate('/signup')} variant="outlined" sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    backdropFilter: 'blur(12px)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    boxShadow: '0 20px 60px rgba(102,126,234,0.2), inset 0 0 20px rgba(255,255,255,0.05)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    Sign Up
                  </Button>
                </HoverSound>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll sections with camera-pan feel */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {[
          { title: 'Generative Storyboards', copy: 'Sketch narrative arcs that evolve with your audience.' },
          { title: 'Realtime Co‑Creation', copy: 'Compose visuals and music with AI collaborators.' },
          { title: 'Production‑Ready', copy: 'Export scenes, prompts, and timelines to your pipeline.' },
        ].map((s, i) => (
          <Container key={i} data-pan-section maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
            <Box sx={{
              transform: `perspective(1200px) translateZ(${30 - i * 10}px)`,
              transition: 'transform 0.6s ease',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)'
            }}>
              <Typography variant="h4" sx={{ fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif', mb: 1.5 }}>
                {s.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(220,230,255,0.85)' }}>
                {s.copy}
              </Typography>
            </Box>
          </Container>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 6, color: 'rgba(200,210,235,0.6)' }}>
        <Typography variant="body2">© 2025 reEarth Creative AI</Typography>
      </Box>
    </Box>
  );
};

export default CinematicLanding;


