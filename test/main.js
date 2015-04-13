var gulp = require('gulp'),
	fs = require('fs'),
	es = require('event-stream'),
	assert = require('assert'),
	svgDimensions = require('../index.js'),
	tap = require('gulp-tap');

describe('gulp-unic-handlebars', function() {
	it('should add dimensions to file object', function(done) {
		var expected = {
				x: 269,
				y: 272
			},
			dimensions;

		gulp.src(__dirname + '/fixtures/icon.svg')
			.pipe(svgDimensions())
			.pipe(tap(function(file) {
				dimensions = file.data.dimensions;
			}))
			.pipe(gulp.dest(__dirname + '/results/'))
			.pipe(es.wait(function() {
				assert.deepEqual(dimensions, expected);

				fs.unlinkSync(__dirname + '/results/icon.svg');
				fs.rmdirSync(__dirname + '/results/');

				done();
			}));
	});
});
