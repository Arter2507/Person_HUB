/** @format */

import { createContext } from 'react';
import type { ThemeContextType } from '../types/theme.type';

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);
