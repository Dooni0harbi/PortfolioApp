import { useEffect, useRef } from "react";

/**
 * StarsBackground
 * خلفية نجوم متلألئة (تطفي وتنور) مع توهج خفيف — تُرسم بالـ canvas لأداء سلس.
 *
 * طريقة الاستخدام:
 * 1) ضعي هذا الملف في src/components/StarsBackground.jsx
 * 2) في App.jsx (أول عنصر داخل الـ return):
 *      import StarsBackground from "./components/StarsBackground";
 *      ...
 *      <StarsBackground />
 *      <div className="app-content">...بقية المحتوى...</div>
 * 3) تأكدي أن العنصر اللي بعدها (المحتوى) عنده position: relative
 *    و z-index أعلى منها حتى يظهر فوق الخلفية.
 *
 * تقدرين تتحكمين بالكثافة واللون من الـ props تحت.
 */
export default function StarsBackground({
  starCount = 140,
  backgroundColor = "#0b0b0e",
  starColor = "230, 230, 235",
  glowColor = "255, 255, 255",
  glowStrength = 0.12, // خليها 0 لو تبينها نجوم بسيطة بدون أي هالة، مثل اللقطة المرفقة
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width, height, stars;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.05 + 0.01,
      }));
    };

    const draw = (time) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        // نبضة التلألؤ: تطفي وتنور بشكل ناعم
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        const alpha = star.baseAlpha * (0.3 + twinkle * 0.7);

        // هالة خفيفة جدًا (اختيارية) — لو glowStrength = 0 تختفي تمامًا وتصير نقطة بسيطة فقط
        if (glowStrength > 0) {
          const glow = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 4
          );
          glow.addColorStop(0, `rgba(${glowColor}, ${alpha * glowStrength})`);
          glow.addColorStop(1, `rgba(${glowColor}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // جسم النجمة نفسها
        ctx.beginPath();
        ctx.fillStyle = `rgba(${starColor}, ${alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // انجراف بطيء جدًا للأعلى (اختياري لإحساس الحركة)
        star.y -= star.driftSpeed;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [starCount, backgroundColor, starColor, glowColor, glowStrength]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
