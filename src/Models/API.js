import Axios from 'axios';

/**
 * Initiating a GET request
 * @param {*} path
 */
async function get(path) {
	return await Axios.get(path);
}

/**
 * Initiating a POST request
 * @param {*} path
 * @param {*} params
 */
async function post(path, params) {
	return await Axios.post(path, params);
}

export default { get, post };
