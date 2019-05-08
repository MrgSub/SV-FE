import React, { Component } from 'react';
import { Auth } from '../Models';
class verifyToken extends Component {
	componentDidMount() {
		let token = this.props.match.params.token;
		Auth.verifyToken(token).then(resp => {
			if (resp.data.message === 'valid') {
				Auth.setToken(token, resp.data.data.expiry_date);
			}
			this.props.history.push('/');
		});
	}
	render() {
		return <div />;
	}
}

export { verifyToken };
