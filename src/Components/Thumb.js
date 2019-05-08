import React, { Component } from 'react';

class Thumb extends Component {
	render() {
		let { stream } = this.props;
		return (
			<div
				onClick={() => this.props.onClick(stream.id.videoId)}
				className='Stream'
			>
				<div
					className='Thumb'
					style={{
						background:
							'url(' + stream.snippet.thumbnails.high.url + ')',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'cover'
					}}
				/>
				<div className='Info'>
					<h3>{stream.snippet.title}</h3>
					<p>{stream.snippet.description}</p>
				</div>
			</div>
		);
	}
}

export { Thumb };
