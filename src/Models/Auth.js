import API from './API';
import Native from './Native';

/**
 * Update the browser cookies to carry the user's OAuth token
 * @param {*} token
 */
const setToken = token => {
	Native.set('G', token);
};

/**
 * Get the current OAuth cookie in the browser
 */
const getToken = () => {
	return Native.get('G');
};

/**
 * Submit a GET request to verify the token
 * @param {*} token
 */

async function verifyToken(token) {
	const res = await API.get(
		'https://sl-sv.herokuapp.com/AuthUrl/verifyToken/' + token
	);
	return res;
}

/**
 * Submit a message to the server to be sent
 * @param {*} chat
 * @param {*} message
 */
async function sendMessage(chat, message) {
	let token = getToken();
	const res = await API.post(
		'https://sl-sv.herokuapp.com/sendMessage/' + chat,
		{ message: message, token: token }
	);
	return res;
}

/**
 * Generate a URL used to login using Google
 */
async function generateAuthUrl() {
	const res = await API.get('https://sl-sv.herokuapp.com/AuthUrl');
	return res.data.authUrl;
}

/**
 * Get available streams from Youtube API
 */
async function getStreams() {
	const res = await API.get('https://sl-sv.herokuapp.com/getStreams/');
	return res;
}

/**
 * Get info about the provided video, used to get the chatId
 * @param {*} video
 */
async function getVideoInfo(video) {
	const res = await API.get('https://sl-sv.herokuapp.com/videoInfo/' + video);
	return res;
}

/**
 * Get the messages for the chat from Youtube API
 * @param {*} chat
 */
async function getChatMessages(chat) {
	const res = await API.get(
		'https://sl-sv.herokuapp.com/getMessages/' + chat
	);
	return res;
}

export default {
	generateAuthUrl,
	setToken,
	getToken,
	verifyToken,
	getStreams,
	getVideoInfo,
	getChatMessages,
	sendMessage
};
