'use client';

import Link from 'next/link';
import { NAV_LINKS } from '@/lib/nav-links';

const InvestmentLinks = () => {
  const investmentLinks = NAV_LINKS.filter(link => link.location === 'footer');

  return (
    <div>
      <h4 className="font-semibold text-lg mb-6 text-white">Investment Opportunities</h4>
      <ul className="space-y-3 text-slate-400">
        {investmentLinks.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestmentLinks;