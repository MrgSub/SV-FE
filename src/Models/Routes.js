import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Views from '../Views';

/**
 * Stating the app's routes
 */
const Routes = {
	Home: '/',
	verifyToken: '/verifyToken/:token'
};

/**
 * Initial Router for the app, looping through the `Routes` and generating `<Route />`s
 */
function InitRouter() {
	return (
		<Router>
			{Object.keys(Routes).map((el, i) => {
				return (
					<Route
						key={i}
						exact
						path={Routes[el]}
						component={Views[el]}
					/>
				);
			})}
		</Router>
	);
}

export { InitRouter as Router, Routes };
