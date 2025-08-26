'use client';

import { BarChart3, CheckCircle } from 'lucide-react';
import InvestmentLinks from './InvestmentLinks';
import ResourcesLinks from './ResourcesLinks';
import ContactInfo from './ContactInfo';
import FooterLegal from './FooterLegal';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />
                <div className="relative z-10 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <span className="text-2xl font-bold">
                Opty<span className="text-blue-400">Money</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              An integrated platform for individual financial management problems
            </p>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-slate-400">SSL Secured Platform</span>
            </div>
          </div>

          {/* Other columns */}
          <InvestmentLinks />
          <ResourcesLinks />
          <ContactInfo />
        </div>

        {/* Copyright & Legal */}
        <FooterLegal />
      </div>
    </footer>
  );
};

export default Footer;
