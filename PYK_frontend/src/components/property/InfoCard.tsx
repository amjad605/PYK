import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  value: number | string | undefined;
  label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-blue/5 rounded-2xl border border-blue/20">
      <div className="p-3 bg-blue/10 rounded-xl">{icon}</div>
      <div>
        <div className="text-xl md:text-2xl font-bold text-foreground">
          {value}
        </div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
};

export default InfoCard;
