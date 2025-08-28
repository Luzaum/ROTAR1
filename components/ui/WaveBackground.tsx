import React, { useRef, useEffect } from 'react';

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    let animationId: number;
    let time = 0;

    // Reduzir complexidade em dispositivos móveis
    const waveCount = isMobile ? 4 : 8;
    let waveData = Array(waveCount).fill(0).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const updateWaveData = () => {
      waveData.forEach(data => {
        if (Math.random() < (isMobile ? 0.005 : 0.01)) {
          data.targetValue = Math.random() * 0.7 + 0.1;
        }
        data.value += (data.targetValue - data.value) * data.speed;
      });
    };

    const draw = () => {
      // Use a cor de fundo do tema escuro do app
      const isDarkMode = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDarkMode ? '#09090b' : '#ffffff'; // Cor slate-950 ou white
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reduzir qualidade em dispositivos móveis para melhor performance
      const stepSize = isMobile ? 2 : 1;
      
      for (let i = 0; i < waveCount; i++) {
        const freq = waveData[i].value * 7.0;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += stepSize) {
          const normalizedX = (x / canvas.width) * 2 - 1;
          let px = normalizedX + i * 0.04 + freq * 0.03;
          let py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / waveCount);
          const canvasY = (py + 1) * canvas.height / 2;
          x === 0 ? ctx.moveTo(x, canvasY) : ctx.lineTo(x, canvasY);
        }

        const intensity = Math.min(1, freq * 0.3);
        const layer = i / (waveCount - 1);
        const baseG = 70 + (1 - layer) * 170;
        const g = Math.min(255, Math.round(baseG + intensity * 15));

        ctx.lineWidth = 1 + (i * 0.3);
        ctx.strokeStyle = `rgba(0, ${g}, 0, 0.4)`; // Verde com opacidade
        ctx.shadowColor = `rgba(0, ${g}, 0, 0.3)`;
        ctx.shadowBlur = isMobile ? 2 : 5; // Reduzir blur em mobile
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const animate = () => {
      time += isMobile ? 0.01 : 0.02; // Reduzir velocidade em mobile
      updateWaveData();
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh' }} />;
}

