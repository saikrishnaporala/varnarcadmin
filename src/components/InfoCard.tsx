import React from 'react';

interface InfoCardProps {
  title: string;
  value: string;
  subtitle: string;
  bgGradient: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, subtitle, bgGradient, icon }) => {
  return (
    <div className={`rounded-lg p-6 text-white ${bgGradient} relative overflow-hidden`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-2xl opacity-30">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-1 text-sm">{subtitle}</div>
    </div>
  );
};

export default InfoCard;
