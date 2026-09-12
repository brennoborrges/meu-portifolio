'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const words = ['dev', 'design', 'growth', 'sh'];

export function TypewriterLogo() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < targetWord.length) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, 120);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <Link 
      href="/" 
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-300 hover:border-zinc-700 transition-colors group"
    >
      <span className="text-emerald-400 font-semibold group-hover:scale-110 transition-transform select-none">&gt;_</span>
      <span>brenno.</span>
      <span className="text-emerald-300 font-semibold min-w-8">
        {currentText}
      </span>
      <span className="w-1.5 h-3.5 bg-emerald-400 inline-block animate-pulse ml-0.5" />
    </Link>
  );
}