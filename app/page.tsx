'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function BirthdayPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  if (!isClient) return null; // Уникнення помилок гідратації

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden relative selection:bg-pink-500 selection:text-white">
      
      {/* Фоновий градієнт (Blur Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

      {/* Картка (Glassmorphism) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 relative w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-center"
      >
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold mb-4 border border-pink-500/30">
                ✨ Особливий день
            </span>
            <h4>🎂</h4>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-6 leading-tight">
            З Днем Народження, <br/> Сонічка! 
            </h1>

        </motion.div>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-200 text-lg mb-8 leading-relaxed font-light"
        >
          Ти — людина, яка сяє яскравіше за будь-кого. Бажаю, щоб твій рік був таким же бездоганним, як і ти). <br/>
          <span className="block mt-4 text-pink-200 font-medium">Сяй!</span>
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchConfetti}
          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full shadow-lg hover:shadow-pink-500/50 hover:from-pink-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ring-offset-black"
          >
          🎁 Натисни
        </motion.button>
      </motion.div>
      
      <div className="absolute bottom-4 text-white/20 text-xs font-light">
        Зроблено з ❤️ спеціально для тебе
      </div>
    </main>
  );
}