import React, { useRef } from 'react';

// Lightweight hover sound using WebAudio API
const HoverSound = ({ children, freq = 520 }) => {
  const ctxRef = useRef(null);

  const play = () => {
    try {
      const ctx = ctxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.value = 0.0001;
      o.connect(g).connect(ctx.destination);
      o.start();
      // Fade out quickly
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      o.stop(ctx.currentTime + 0.16);
    } catch (_) {
      // Ignore audio errors on unsupported devices
    }
  };

  return React.cloneElement(children, {
    onMouseEnter: (e) => { play(); children.props.onMouseEnter && children.props.onMouseEnter(e); }
  });
};

export default HoverSound;


