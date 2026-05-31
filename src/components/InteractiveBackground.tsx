import { useEffect, useRef } from "react";

/**
 * Premium interactive background:
 *  - a subtle dot grid drawn on a canvas
 *  - dots near the cursor brighten, scale up and tint toward the accent
 *  - a soft accent glow follows the cursor (lerped for smoothness)
 */
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const glow = glowRef.current!;

    const GAP = 30;          // distance between dots
    const RADIUS = 170;      // mouse influence radius
    const ACCENT = [255, 31, 75];

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Target + smoothed mouse position
    const mouse = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    let raf = 0;
    function draw() {
      // ease the cursor for buttery motion
      smooth.x += (mouse.x - smooth.x) * 0.12;
      smooth.y += (mouse.y - smooth.y) * 0.12;

      glow.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0)`;

      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width + GAP; x += GAP) {
        for (let y = 0; y < height + GAP; y += GAP) {
          const dx = x - smooth.x;
          const dy = y - smooth.y;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / RADIUS); // 0..1 closeness

          const base = 0.06;
          const alpha = base + t * 0.7;
          const size = 1 + t * 1.8;

          if (t > 0) {
            ctx.fillStyle = `rgba(${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]}, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${base})`;
          }
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="bg-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div ref={glowRef} className="bg-glow" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </div>
  );
}
