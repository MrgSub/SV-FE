import React, { Component } from 'react';
import { Auth } from '../Models';
import { Message, Loading, ChatBox } from './index';

class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoInfo: null,
			messages: null,
			loaded: null
		};
		this.updateInt = null;
	}

	componentDidUpdate() {
		const node = this.node;
		if (node && !this.state.loaded) {
			node.scrollIntoView({ behavior: 'smooth' });
		}
	}

	/**
	 * Gets the video info, then gets the chat messages according to the `activeLiveChatId`
	 * and the creates an interval to update the messages from the server
	 */
	componentWillMount() {
		let { currentStream } = this.props;
		Auth.getVideoInfo(currentStream).then(resp => {
			this.setState({ videoInfo: resp.data.data });
			Auth.getChatMessages(
				resp.data.data.items[0].liveStreamingDetails.activeLiveChatId
			).then(response => {
				this.setState({ messages: response.data.data.items });
				this.setState({ loaded: true });
			});
		});
		this.updateInt = setInterval(() => {
			if (this.state.loaded !== true) {
				return;
			}
			Auth.getChatMessages(
				this.state.videoInfo.items[0].liveStreamingDetails
					.activeLiveChatId
			)
				.then(response => {
					this.setState({ messages: response.data.data.items });
				})
				.catch(err => {
					console.info(err);
				});
		}, 1000);
	}

	render() {
		let { currentStream } = this.props;
		let { messages, videoInfo } = this.state;
		return (
			<div className='Video__Container'>
				<div onClick={this.props.resetState} className='CloseBtn' />
				<div className='Inner'>
					<div className='Video'>
						<iframe
							className='iframe'
							title='videoIframe'
							src={
								'https://www.youtube.com/embed/' +
								currentStream +
								'?&autoplay=1'
							}
							frameborder='0'
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							allowfullscreen
						/>
					</div>

					{messages ? (
						<div className='Chat'>
							<div className='Inner'>
								<ChatBox videoInfo={videoInfo}>
									{messages.map(message => {
										return <Message message={message} />;
									})}
									<div
										ref={node => {
											this.node = node;
										}}
									/>
								</ChatBox>
							</div>
						</div>
					) : (
						<Loading />
					)}
				</div>
			</div>
		);
	}
}

export { Video };
