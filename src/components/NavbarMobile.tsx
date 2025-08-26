'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // adjust path to your Button component
import { FC } from 'react';
import { NAV_LINKS } from '@/lib/nav-links';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobile: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const headerLinks = NAV_LINKS.filter(link => link.location === 'header');


  return (
    <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg z-50">
      <div className="container mx-auto px-6 py-6 space-y-4">
        {headerLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default NavbarMobile;
