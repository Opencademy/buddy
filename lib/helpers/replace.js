'use strict';

var escape = require('../utils/reEscape.js')

	  // Match process.env.FOO, process.env['FOO'], or process.env["FOO"]
	, RE_ENV = /process\.env(?:(?:\[['|"])|\.)(\w+)(?:['|"]\])?/gm;

/**
 * Replace all dependency id's in 'content' with fully resolved
 * @param {String} content
 * @param {String} type
 * @param {Array} references
 * @returns {String}
 */
exports.references = function (content, type, references) {
	var prop = (type == 'html') ? 'filepath' : 'id'
		, context;

	references.forEach(function (reference) {
		// Set filepath for inline-source object
		if (type == 'html' && reference.stack) {
			reference.filepath = reference.instance.filepath;
		// Replace paths
		} else if (reference.instance && reference.filepath != reference.instance[prop]) {
			context = reference.match.replace(reference.filepath, reference.instance[prop]);
			// Create new RegExp so that flags work properly
			content = content.replace(new RegExp(escape(reference.match), 'gm'), context);
		}
	});

	return content;
};

/**
 * Inline all "process.env" references
 * @param {String} content
 * @param {Array} references
 * @returns {String}
 */
exports.environment = function (content) {
	var matches = {}
		, match;

	// Find all matches
	while (match = RE_ENV.exec(content)) {
		var env = process.env[match[1]]
				// Do not stringify empty values
			, value = (env != undefined)
				? "'" + env + "'"
				: env;

		matches[match[0]] = value;
	}

	// Replace all references
	for (var context in matches) {
		// Create new RegExp so that flags work properly
		content = content.replace(new RegExp(escape(context), 'gm'), matches[context]);
	}

	return content;
};