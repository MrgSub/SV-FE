import React, { Component } from 'react';

class Message extends Component {
	render() {
		let { message } = this.props;
		var messageDate = new Date(message.snippet.publishedAt);
		var minutes = messageDate.getMinutes();
		var hours = messageDate.getHours();
		return (
			<div className='Message__Container'>
				<div className='Message__Inner'>
					<div
						className='AuthorAvatar'
						style={{
							background:
								'url(' +
								message.authorDetails.profileImageUrl +
								')',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							backgroundSize: 'contain'
						}}
					/>
					<div className='Body'>
						<div className='AuthorName'>
							{message.authorDetails.displayName}
						</div>
						<div className='MessageBody'>
							{message.snippet.textMessageDetails.messageText}
						</div>
						<div className='Timestamp'>
							{hours}:{minutes}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { Message };
