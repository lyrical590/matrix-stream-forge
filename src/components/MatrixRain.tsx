import React, { useMemo } from 'react';

const MatrixRain: React.FC = () => {
  const columns = useMemo(() => Array.from({ length: 40 }), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 z-0">
      <div className="flex justify-between w-full h-full">
        {columns.map((_, i) => (
          <div
            key={i}
            className="flex flex-col text-[10px] leading-none animate-matrix-rain"
            style={{
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <span key={j} className="text-matrix-green">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixRain;