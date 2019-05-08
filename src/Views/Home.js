import React, { Component } from 'react';
import { Auth } from '../Models';
import { GButton, Loading, Stream } from '../Components';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: null,
			authUrl: null
		};
	}

	componentDidMount() {
		let token = Auth.getToken();
		Auth.verifyToken(token).then(resp => {
			if (resp.data.message === 'valid') {
				this.setState({ isLoggedIn: true });
			} else {
				Auth.generateAuthUrl().then(url => {
					this.setState({ authUrl: url });
				});
			}
		});
	}

	render() {
		let { isLoggedIn, authUrl } = this.state;
		return isLoggedIn ? (
			<Stream />
		) : authUrl ? (
			<div className='Home__Container'>
				<GButton authUrl={authUrl} />
			</div>
		) : (
			<Loading />
		);
	}
}

export { Home };
