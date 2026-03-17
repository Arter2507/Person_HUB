/** @format */

import type { ZodiacSign } from '../types/loving.type';

/**
 * Calculates the number of days between a start date and today.
 * @param {Date | undefined} startDate - The start date.
 * @returns {number} The total number of days.
 */
export const calculateDays = (startDate?: Date): number => {
	if (!startDate) return 0;
	const start = startDate.getTime();
	const today = new Date().getTime();
	const difference = today - start;
	return Math.floor(difference / (1000 * 60 * 60 * 24));
};

/**
 * Calculates the age of a person from their date of birth.
 * @param {Date | undefined} dob - The date of birth.
 * @returns {number} The person's current age.
 */
export const calculateAge = (dob?: Date): number => {
	if (!dob) return 0;
	const birthDate = dob;
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
};

/**
 * Determines the Zodiac sign based on a date of birth.
 * @param {Date | undefined} dob - The date of birth.
 * @returns {ZodiacSign} The corresponding Zodiac sign.
 */
export const getZodiacSign = (dob?: Date): ZodiacSign => {
	if (!dob) return 'Unknown';
	const birthDate = dob;
	const day = birthDate.getDate();
	const month = birthDate.getMonth() + 1;

	if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
	if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
	if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
	if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
	if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
	if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
	if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
	if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
		return 'Scorpio';
	if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
		return 'Sagittarius';
	if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
		return 'Capricorn';
	if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
		return 'Aquarius';
	return 'Pisces';
};
