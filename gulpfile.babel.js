import del          from 'del';
import gulp         from 'gulp';
import jasmine      from 'gulp-jasmine';
import shell        from 'gulp-shell';
import jsdoc        from 'gulp-jsdoc3';
import run          from 'run-sequence';

const paths = {

    js:     [ './src/**/*.js' ],
    spec:   [ './src/**/*.spec.js' ],
    src:    './src',
    doc:    './doc',
    app:    './app'
};

gulp.task( 'default', cb => {

    run( 'clean', 'babel', 'docs', 'test', cb );
});

gulp.task( 'docs', cb => {

    run( 'clean-doc', 'build-doc', cb );
});

gulp.task( 'build-doc', buildDoc );

gulp.task( 'clean', cb => {

    run( 'clean-app', 'clean-doc', cb );
});

gulp.task( 'clean-app', cb => {

    return del( [ paths.app ] );
});

gulp.task( 'clean-doc', cb => {

    return del( [ paths.doc ] );
});

gulp.task( 'babel', shell.task([

    'babel src --out-dir app'
]));

gulp.task( 'test', () => {

    gulp.src( paths.spec )
        .pipe( jasmine( { verbose: true } ) )
    ;
});

function buildDoc( cb ) {

    let config = { opts: { destination: paths.doc } };

    gulp.src( [ 'README.md', './src/**/*.js' ], { read: false } )
        .pipe( jsdoc( config, cb ) )
    ;
}
