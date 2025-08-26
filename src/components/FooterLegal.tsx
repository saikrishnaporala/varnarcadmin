'use client';

import { NAV_LINKS } from "@/lib/nav-links";
import Link from "next/link";

const FooterLegal = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = NAV_LINKS.filter(link => link.location === "footer_legal");

  return (
    <div className="border-t border-slate-800 pt-8 space-y-4 text-xs text-slate-500">
      <p>
        <strong>Registrations:</strong> CIN: U72900KA2018PTC111791 | AMFI: ARN 157435 | BSE Member ID: 1513303 | ERI
        Registration: ERIA101037 | MSME Udhyam Registration: UDYAM-KR-03-0009603
      </p>
      <div className="flex flex-wrap gap-6 pt-4">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
      <p className="pt-4">&copy; {currentYear} OptyMoney. A Venture of Devmantra. All rights reserved.</p>
    </div>
  );
};

export default FooterLegal;
