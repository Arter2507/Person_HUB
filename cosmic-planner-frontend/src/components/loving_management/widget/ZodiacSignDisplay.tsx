/** @format */

import React from 'react';
import type {
	ZodiacSign,
	ZodiacSignDisplayProps,
} from '../../../types/loving.type';

// FIX: Added 'Unknown' key to satisfy the Record<ZodiacSign, string> type.
const zodiacIcons: Record<ZodiacSign, string> = {
	Aries: '♈',
	Taurus: '♉',
	Gemini: '♊',
	Cancer: '♋',
	Leo: '♌',
	Virgo: '♍',
	Libra: '♎',
	Scorpio: '♏',
	Sagittarius: '♐',
	Capricorn: '♑',
	Aquarius: '♒',
	Pisces: '♓',
	Unknown: '❔',
};

const ZodiacSignDisplay: React.FC<ZodiacSignDisplayProps> = ({ sign }) => {
	return (
		<span className='flex items-center space-x-1 text-sm text-foreground/80'>
			<span>{zodiacIcons[sign]}</span>
			<span>{sign}</span>
		</span>
	);
};

export default ZodiacSignDisplay;
