module.exports = {
  paths: {
    watched: ['src'],
    public: 'www/assets'
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src\/)/,
        'js/app.js': /^(src\/scripts\/)/
      }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^(src\/styles\/)/
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
