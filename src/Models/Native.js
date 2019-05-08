import Cookies from 'js-cookie';

/**
 * Get the cookie's value according to the key
 * @param {*} key
 */
function get(key) {
	return Cookies.get(key);
}

/**
 * Set the cookie's value
 * @param {*} key
 * @param {*} value
 * @param {*} expiry
 */
function set(key, value, expiry = 365) {
	return Cookies.set(key, value, {
		expires: expiry
	});
}

export default { get, set };
