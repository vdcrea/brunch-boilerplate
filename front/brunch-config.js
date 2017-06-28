module.exports = {
  paths: {
    public: '../www/assets'
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!app\/)/,
        'js/app.js': /^(app\/scripts\/)/
      }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^(app\/styles\/)/
      }
    }
  },
  plugins: {
    static: {
      processors: [
        require('html-brunch-static')({
          partials: '/markup/partials?/',
          layouts: '/markup/layouts?/',
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
