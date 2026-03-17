import React, { useState, useEffect } from 'react';

/**
 * Footer component
 * Displays copyright information and a live-updating clock.
 */
const Footer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the time every second
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        
        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Format date and time as requested
    const formattedDate = currentTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <footer className="h-12 flex-shrink-0 bg-card border-t border-border flex items-center justify-between px-4 md:px-6 text-sm text-muted-foreground">
            {/* Left side: Copyright */}
            <div>
                © {new Date().getFullYear()} Cosmic Planner Hub. All rights reserved.
            </div>
            
            {/* Right side: Live Clock */}
            <div className="flex items-center gap-2 font-mono">
                <span>{formattedDate}</span>
                <span className="w-px h-4 bg-border"></span>
                <span>{formattedTime}</span>
            </div>
        </footer>
    );
};

export default Footer;