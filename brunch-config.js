module.exports = {
  paths: {
    watched: ['src'],
    public: 'www/src'
  },
  npm: {
      styles: {
          'slick-carousel': [
            'slick/slick.css',
            'slick/slick-theme.css'
          ]
      }
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src\/)/,
        'js/main.js': /^(src\/scripts\/)/
      }
    },
    stylesheets: {
      joinTo: {
        'css/vendor.css': /^node_modules/,
        'css/main.css': /^(src\/styles\/)/
      }
    }
  },
  plugins: {
    static: {
      processors: [
        require('html-brunch-static')({
          partials: '/src/markup/partials?/',
          layouts: '/src/markup/layouts?/',
          handlebars: {
            enableProcessor: true
          },
          processors: [
            require('pug-brunch-static')({
              fileTransform: (filename) => filename.replace(/static\.pug$/, '.html')
            })
          ]
        })
      ]
    },
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    },
    babel: {
      presets: ['latest']
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 20 versions']),
        require('csswring')
      ]
    }
  }
};
