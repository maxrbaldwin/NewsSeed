module.exports = {
    app: {
        src: ['react/*.jsx', 'react/app/*.jsx', 'react/app/**/*.jsx'],
        dest: 'public/scripts/app.js',
        options: {
            transform: ['reactify']
        }
    },
    home: {
    	src: ['react/home/*.jsx', 'react/home/**/*.jsx'],
    	dest: 'public/scripts/home/index.js',
    	options: {
    		transform: ['reactify']
    	}
    }
};
