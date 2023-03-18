import { Fragment, createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { useLoginAuth } from '~/hooks';
import { FollowAnUserProvider } from './hooks/useFollowAnUser';

export const AuthUserContext = createContext();
function App() {
	// const storageUser = JSON.parse(localStorage.getItem('user'));
	// const [authUser, setAuthUser] = useState(storageUser);

	// useEffect(() => {
	// 	const handleStorageChange = () => {
	// 		setAuthUser(storageUser);
	// 	};

	// 	window.addEventListener('storage', handleStorageChange);
	// 	return () => {
	// 		window.removeEventListener('storage', handleStorageChange);
	// 	};
	// }, []);
	// const [authUser, setAuthUser] = useState(() => {
	// 	const storageUser = JSON.parse(localStorage.getItem('user'));
	// 	return storageUser || null;
	// });

	// useEffect(() => {
	// 	const handleStorageChange = () => {
	// 		const storageUser = JSON.parse(localStorage.getItem('user'));
	// 		setAuthUser(storageUser);
	// 	};

	// 	window.addEventListener('storage', handleStorageChange);
	// 	return () => {
	// 		window.removeEventListener('storage', handleStorageChange);
	// 	};
	// }, []);
	const storageUser = JSON.parse(localStorage.getItem('user'));
	const [authUser, setAuthUser] = useState(storageUser);
	useEffect(() => {
		setAuthUser(storageUser);
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(authUser));
	}, [authUser]);
	// const [loginUser, isLoggedIn, setIsLoggedIn, error] = useLoginAuth();

	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		const user = JSON.parse(localStorage.getItem('user'));
	// 		setAuthUser(user);
	// 	}
	// }, [isLoggedIn]);

	return (
		<AuthUserContext.Provider value={{ authUser, setAuthUser }}>
			<FollowAnUserProvider>
				<Router>
					<div className="App">
						<Routes>
							{publicRoutes.map((route, index) => {
								const Page = route.component;

								let Layout = DefaultLayout;

								if (route.layout) {
									Layout = route.layout;
								} else if (route.layout === null) {
									Layout = Fragment;
								}

								return (
									<Route
										key={index}
										path={route.path}
										element={
											<>
												<Layout>
													<Page />
												</Layout>
											</>
										}
									/>
								);
							})}
						</Routes>
					</div>
				</Router>
			</FollowAnUserProvider>
		</AuthUserContext.Provider>
	);
}

export default App;
