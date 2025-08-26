// components/NavbarDesktop.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button'; // adjust this import if needed
import { NAV_LINKS } from '@/lib/nav-links'; // adjust path if needed

const NavbarDesktop = () => {
  const headerLinks = NAV_LINKS.filter(link => link.location === 'header');
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {headerLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
        >
          {item.label}
        </Link>
      ))}
      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 shadow-lg">
        Get Started
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </nav>
  );
};

export default NavbarDesktop;
