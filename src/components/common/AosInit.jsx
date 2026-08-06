'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800, // অ্যানিমেশন সময় (ms)
      once: true,    // একবার স্ক্রোল হয়ে গেলে অ্যানিমেশন বারবার হবে না
      easing: 'ease-in-out',
    });
  }, []);

  return null;
}