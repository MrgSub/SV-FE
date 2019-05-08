import React, { useState } from 'react';
import { Auth } from '../../Models';
import { Loading } from '../Loading';

/**
 * Using React Hooks here
 */
const ChatBox = ({ videoInfo, children }) => {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(null);

	function handleUpdate(event) {
		setMessage(event.target.value);
	}

	function handleSend() {
		setLoading(true);
		Auth.verifyToken(Auth.getToken())
			.then(resp => {
				if (resp.data.message === 'valid') {
					Auth.sendMessage(
						videoInfo.items[0].liveStreamingDetails
							.activeLiveChatId,
						String(message)
					)
						.then(resp => {
							console.info(resp);
							setLoading(null);
							setMessage('');
						})
						.catch(err => {
							console.error(err);
							setLoading(null);
						});
				}
			})
			.catch(err => {
				console.error(err);
				window.location.reload();
			});
	}

	/**
	 * Enabling `enter` to send
	 * @param {*} target
	 */
	function handleKeyPress(target) {
		if (target.charCode == 13) {
			let confirm = window.confirm('Are you sure you want to send this?');
			if (confirm === true) {
				handleSend();
			}
		}
	}

	return (
		<div className='ChatBox__Container'>
			<div className='ChatBox__Inner'>{children}</div>
			<div className='MessageForm__Container'>
				<div className='MessageForm__Inner'>
					<div className='MessageForm'>
						{loading ? (
							<div className='IconLoading' />
						) : (
							<div className='Icon' />
						)}
						<input
							value={message}
							onChange={handleUpdate}
							className='Input'
							type='text'
							placeholder='Start typing..'
						/>
						<div className='Action' onClick={handleSend} />
					</div>
				</div>
			</div>
		</div>
	);
};

export { ChatBox };
