import React from 'react';
import { Card, CardContent } from '../ui/card';

/**
 * UserStatusBar component
 * Greets the user, shows a motivational quote, and displays gamified stats.
 */
const UserStatusBar: React.FC = () => {
    // In a real app, this data would come from user state or an API.
    const userName = "Explorer";
    const dailyQuote = "The cosmos is within us. We are made of star-stuff.";
    const userStats = [
        { label: 'Level', value: '12', icon: '🌟' },
        { label: 'XP', value: '1,250 / 2,000', icon: '🚀' },
        { label: 'Streak', value: '5 Days', icon: '🔥' },
    ];

    return (
        <Card>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Side: Welcome Message & Quote */}
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Welcome, {userName}!!</h2>
                    <p className="text-muted-foreground italic mt-1">"{dailyQuote}"</p>
                </div>

                {/* Right Side: Avatar & Gamified Stats */}
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-4">
                        {userStats.map(stat => (
                            <div key={stat.label} className="flex items-center gap-2 text-sm">
                                <span className="text-lg">{stat.icon}</span>
                                <div>
                                    <div className="font-semibold text-foreground">{stat.value}</div>
                                    <div className="text-muted-foreground">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                     {/* User Avatar */}
                    <img
                        src={`https://api.dicebear.com/8.x/bottts/svg?seed=${userName}`}
                        alt="User Avatar"
                        className="w-14 h-14 rounded-full border-2 border-primary flex-shrink-0"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default UserStatusBar;
