import React from 'react';

const InfoBanner = ({ icon, text, className = '' }) => {
    return (
        <div className={`p-[2px] rounded-lg animate-gradient-border ${className}`.trim()}>
            <div className="p-3 rounded-lg bg-white backdrop-blur-sm shadow-sm">
                <div className="flex items-start gap-2">
                    {icon && (
                        <div className="flex-shrink-0">
                            <img src={icon} alt="Info" className="w-4 h-4" />
                        </div>
                    )}
                    <p className="text-xs text-gray-600">{text}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoBanner;
