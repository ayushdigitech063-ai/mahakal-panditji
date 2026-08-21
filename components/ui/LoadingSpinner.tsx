import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#c96b18] border-t-transparent rounded-full animate-spin"></div>
      <span className="heading-spiritual text-base font-semibold text-[#8f3f12]">
        Loading Mahakal Sacred Data...
      </span>
    </div>
  );
};
