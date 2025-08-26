'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/contact-info';

const ContactInfo = () => {
  const { phone, email, address } = CONTACT_INFO;

  return (
    <div>
      <h4 className="font-semibold text-lg mb-6 text-white">Contact Info</h4>
      <div className="space-y-4 text-slate-400">
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-blue-400" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-400 mt-1" />
          <div>
            {address.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
