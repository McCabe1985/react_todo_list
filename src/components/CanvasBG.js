import React, { useRef, useEffect } from "react";

export const CanvasBG = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "white";
      effect.reset(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);

    class Ball {
      constructor(effect) {
        this.effect = effect;
        this.reset();
      }
      update() {
        if (this.x < this.radius || this.x > this.effect.width - this.radius)
          this.speedX *= -1;
        if (this.y < this.radius || this.y > this.effect.height - this.radius)
          this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      reset() {
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
        this.radius = Math.random() * 200 + 20;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
      }
    }

    class MetaBallsEffect {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
      }
      init(numOfBalls) {
        for (let i = 0; i < numOfBalls; i++) {
          this.metaballsArray.push(new Ball(this));
        }
      }
      update() {
        this.metaballsArray.forEach((metaball) => metaball.update());
      }
      draw() {
        this.metaballsArray.forEach((metaball) => metaball.draw());
      }
      reset(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        this.metaballsArray.forEach((metaball) => metaball.reset());
      }
    }

    const effect = new MetaBallsEffect(canvas.width, canvas.height);
    effect.init(30);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.update();
      effect.draw();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};
