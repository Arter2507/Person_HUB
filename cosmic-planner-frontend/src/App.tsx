/** @format */

import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './contexts/ThemeProvider';
import AppLayout from './layouts/AppLayout';
import { HomepageManagementPage } from './pages/Homepage';
import NotFoundPage from './pages/NotFound';
import { LovingManagementPage } from './pages/LovingPage';
import DashboardManagementPage from './pages/DashboardPage';
import { SharedStateProvider } from './contexts/ShareStateProvider';
import TodoManagementPage from './pages/TodoPage';

export default function App() {
	return (
		<ThemeProvider>
			<SharedStateProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route
								path='/'
								element={<HomepageManagementPage />}
							/>
							<Route
								path='/dashboard'
								element={<DashboardManagementPage />}
							/>
							<Route
								path='/loving'
								element={<LovingManagementPage />}
							/>
							<Route
								path='/todo'
								element={<TodoManagementPage />}
							/>
						</Route>
						<Route
							path='*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</BrowserRouter>
			</SharedStateProvider>
		</ThemeProvider>
	);
}
