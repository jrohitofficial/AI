import React, { useState } from 'react';

const ComplianceAlert = ({ grossMarginPercent = 0 }) => {
  const [isLocked, setIsLocked] = useState(false);
  const benchmark = 28.0;
  const currentMargin = parseFloat(grossMarginPercent);
  const variance = (currentMargin - benchmark);
  const varianceSign = variance >= 0 ? '+' : '';
  
  // Calculate visual representation - scale based on total percentage
  const totalPercentage = benchmark + Math.abs(variance);
  const benchmarkWidth = (benchmark / totalPercentage) * 100;
  const varianceWidth = (Math.abs(variance) / totalPercentage) * 100;
  
  // Determine if it's positive (profit/higher) or negative (concern/lower)
  const isPositive = variance >= 0;
  
  const handleLockAndFinalize = () => {
    setIsLocked(true);
  };

  return (
    <div className="space-y-3">
      {/* Alert Card */}
      <div className={`bg-gradient-to-br ${isPositive ? 'from-green-50 to-green-100 border-green-300' : 'from-red-50 to-red-100 border-red-300'} border-2 rounded-xl p-4 shadow-md`}>
        <div className="flex gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 ${isPositive ? 'border-green-400' : 'border-red-400'}`}>
              {isPositive ? (
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 5v2h2v-2h-2z" />
                </svg>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className={`font-extrabold ${isPositive ? 'text-green-900' : 'text-red-900'} text-sm mb-1.5 tracking-tight`}>
              {isPositive ? 'IRD Compliance Notice' : 'IRD Compliance Alert'}
            </h3>
            <p className={`${isPositive ? 'text-green-800' : 'text-red-800'} text-xs leading-relaxed font-medium`}>
              The current GP Margin <span className={`font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>({currentMargin.toFixed(2)}%)</span> is {isPositive ? 'higher' : 'lower'} than the Industry Benchmark <span className={`font-bold ${isPositive ? 'text-green-900' : 'text-red-900'}`}>({benchmark.toFixed(2)}%)</span> for the <span className="font-semibold">"Trading: Retail Goods"</span> sector.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600">Sector Benchmark</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${isPositive ? 'text-green-600' : 'text-red-600'}`}>Current Variance</span>
              <div className={`w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
          </div>
          
          <div className="relative mb-3">
            <div className="flex items-center gap-0 h-2 rounded-full overflow-hidden shadow-inner bg-gray-200">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-500" style={{ width: `${benchmarkWidth}%` }}></div>
              <div className={`h-full bg-gradient-to-r ${isPositive ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'}`} style={{ width: `${varianceWidth}%` }}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold text-gray-500 mb-0.5">Standard</span>
              <span className="text-xl font-extrabold text-gray-900 tabular-nums">{benchmark.toFixed(1)}%</span>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'} mb-0.5`}>Deviation</span>
              <span className={`text-xl font-extrabold ${isPositive ? 'text-green-600' : 'text-red-600'} tabular-nums`}>{varianceSign}{Math.abs(variance).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-[9px] text-gray-600 mb-3 italic">
          Note: These figures will be mapped directly to the Revenue section of the P&amp;L Statement. Please verify import declarations against Customs data.
        </p>

        <div className="flex gap-1.5">
          <button className="flex-1 px-2.5 py-1.5 rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors border border-gray-300">
            Print Summary
          </button>
          {!isLocked ? (
            <button 
              onClick={handleLockAndFinalize}
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
            >
              Lock &amp; Finalize
            </button>
          ) : (
            <button 
              disabled
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium"
            >
              Locked &amp; Filed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAlert;
