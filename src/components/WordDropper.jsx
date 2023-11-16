import React, { useEffect, useRef } from 'react';
// import './RainfallAnimation.css'; // Import the CSS file for styling
import './WordDropper.css'
const RainfallAnimation = (prps) => {
    const name = prps.searchTerm
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    const letters = name;
    const lettersArray = letters.split('');

    // Setting up the columns
    const fontSize = 20;
    const columns = canvas.width / fontSize;

    // Setting up the drops
    const drops = Array.from({ length: columns }, () => 1);

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = 'rgba(22, 22, 24, .1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    const animationId = setInterval(draw, 60);

    // Cleanup on component unmount
    return () => {
      clearInterval(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="rainfall-animation"></canvas>;
};

export default RainfallAnimation;
