# gulp-svg-dimensions

Uses [Cheerio](https://www.npmjs.com/package/cheerio) to parse SVGs and add their dimensions (integer values of ```width``` and ```height``` attributes) to the file object (```file.data.dimensions```).

## Usage

First, install `gulp-svg-dimensions` as a development dependency:

```shell
npm install --save-dev gulp-svg-dimensions@git+https://git@github.com/unic/gulp-svg-dimensions.git
```

Then, add it to your `gulpfile.js`:

```javascript
var svgDimensions = require('gulp-svg-dimensions');

gulp.task('icons', function(){
  gulp.src(['app/icons/*.svg'])
    .pipe(svgDimensions())
    // Some other plugin making use of file.data.dimensions
    // e.g. { x:100, y:200 }
    .pipe(plugin())
    .pipe(gulp.dest('dist/icons/'));
});
```
