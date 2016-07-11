module.exports = {
    app: {
        files: [{
            expand: true,
            cwd: 'react/',
            src: ['*.jsx'],
            dest: 'public/js/',
            ext: '.js'
        }],
        options: {
            transform: ['reactify']
        }
    }
};
