import React from 'react';

export function Logo() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="bg-indigo-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white">
        <span className="text-white font-bold text-xl">SC</span>
      </div>
    </div>
  );
}
