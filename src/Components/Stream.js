import { Header } from './Header';
import React, { Component } from 'react';
import { Loading } from './Loading';
import { Auth } from '../Models';
import { Explore } from './Explore';

class Stream extends Component {
	constructor(props) {
		super(props);
		this.state = {
			streams: null
		};
	}
	/**
	 * Gets the available streams from the server
	 */
	componentWillMount() {
		Auth.getStreams()
			.then(resp => {
				this.setState({ streams: resp.data.data.items });
			})
			.catch(err => {
				alert('Error');
				console.log(err);
			});
	}
	render() {
		let { streams } = this.state;
		return (
			<div className='Stream__Container'>
				<Header />
				{streams ? <Explore streams={streams} /> : <Loading />}
			</div>
		);
	}
}

export { Stream };
