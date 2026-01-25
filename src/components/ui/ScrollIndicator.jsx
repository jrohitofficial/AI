import React, { useState, useEffect } from 'react';

const ScrollIndicator = ({ targetRef }) => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (targetRef?.current) {
                const { scrollTop, scrollHeight, clientHeight } = targetRef.current;
                const isScrollable = scrollHeight > clientHeight;
                const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
                setShowScrollIndicator(isScrollable && !isAtBottom);
            }
        };

        const target = targetRef?.current;
        if (target) {
            // Initial check
            handleScroll();
            
            // Listen to scroll events
            target.addEventListener('scroll', handleScroll);
            
            // Also check on resize and after a short delay (for content loading)
            window.addEventListener('resize', handleScroll);
            const timeoutId = setTimeout(handleScroll, 100);
            
            return () => {
                target.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleScroll);
                clearTimeout(timeoutId);
            };
        }
    }, [targetRef]);

    if (!showScrollIndicator) return null;

    return (
        <div className="fixed bottom-8 right-8 pointer-events-none z-40">
            <div className="bg-white/30 backdrop-blur-md border border-white/40 text-blue-600 rounded-full p-3 shadow-xl animate-bounce">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default ScrollIndicator;
