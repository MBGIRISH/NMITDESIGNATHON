import React, { useEffect, useRef } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

const NeonOrbsCanvas = ({ density = 24 }) => {
  const ref = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      const count = Math.floor(density);
      orbsRef.current = new Array(count).fill(0).map(() => ({
        x: rand(0, canvas.clientWidth),
        y: rand(0, canvas.clientHeight),
        r: rand(20, 90),
        hue: rand(220, 280),
        alpha: rand(0.2, 0.6),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.2, 0.2)
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (const o of orbsRef.current) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = canvas.clientWidth + o.r;
        if (o.x > canvas.clientWidth + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = canvas.clientHeight + o.r;
        if (o.y > canvas.clientHeight + o.r) o.y = -o.r;

        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        gradient.addColorStop(0, `hsla(${o.hue}, 90%, 65%, ${o.alpha})`);
        gradient.addColorStop(1, `hsla(${o.hue}, 90%, 50%, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(1px) contrast(110%)',
        opacity: 0.9
      }}
    />
  );
};

export default NeonOrbsCanvas;


