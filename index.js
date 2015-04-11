'use strict';

var util = require('gulp-util'),
	through = require('through2'),
	_ = require('lodash'),
	cheerioParse = require('cheerio').load,
	pluginName = 'gulp-svg-dimensions';

function getDimensions(content) {
	// Use cheerio to read <svg width="x" height="y">
	var svgElement = cheerioParse(content).root().find('svg'),
		width = svgElement.attr('width'),
		height = svgElement.attr('height');

	return {
		x: parseInt(width, 10),
		y: parseInt(height, 10)
	};
}

module.exports = function(options) {
	options = _.merge({
		// No options so far
	}, options || {});

	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			this.push(file);

			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new util.PluginError(pluginName, 'Streaming not supported'));

			return cb();
		}

		var contents = file.contents.toString(),
			dimensions = getDimensions(contents);

		// Save dimensions to data property of file object
		file.data = _.merge({}, file.data, {
			dimensions: dimensions
		});

		// Add file back to stream
		this.push(file);

		cb();
	});
};
