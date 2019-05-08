import React, { Component } from 'react';
import { Thumb } from './Thumb';
import { Video } from './Video';

class Explore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStream: null
		};
		this.updateStream = this.updateStream.bind(this);
	}

	updateStream(streamId = null) {
		streamId
			? this.setState({ currentStream: streamId })
			: this.setState({ currentStream: null });
	}

	render() {
		let { streams } = this.props;
		let { currentStream } = this.state;
		return (
			<div className='Viewer__Container'>
				{currentStream ? (
					<Video
						resetState={() => {
							window.location.reload();
						}}
						currentStream={currentStream}
					/>
				) : (
					streams.map((stream, i) => {
						return (
							<Thumb
								onClick={this.updateStream}
								stream={stream}
								key={i}
							/>
						);
					})
				)}
			</div>
		);
	}
}

export { Explore };
