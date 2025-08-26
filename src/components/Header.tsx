'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarDesktop from '@/components/NavbarDesktop';
import NavbarMobile from '@/components/NavbarMobile';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />
                <div className="relative z-10 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Opty<span className="text-blue-600">Money</span>
              </h1>
              <p className="text-xs text-slate-500 -mt-1 font-medium tracking-wide">
                FINANCIAL PLATFORM
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavbarDesktop />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
