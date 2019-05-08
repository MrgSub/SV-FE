import React from 'react';

/**
 * A custom Google Login button because why not
 */
function GButton({ authUrl }) {
	return (
		<a className='Button' href={authUrl}>
			<div className='Inner'>Login with Google</div>
		</a>
	);
}

export { GButton };
