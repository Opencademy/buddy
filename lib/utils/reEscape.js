'use strict';

/**
 * Escape 'str' for use in RegExp constructor
 * @param {String} str
 * @returns {String}
 */
 module.exports = function escape (str) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};