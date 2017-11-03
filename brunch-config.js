module.exports = {
  paths: {
    watched: ['src'],
    public: 'www/src'
  },
  modules: {
    autoRequire: {
      'js/main.js': ['src/main']
    }
  },
  npm: {
    globals: {
      $: 'jquery',
      jQuery: 'jquery'
    },
    styles: {
      'slick-carousel': [
        'slick/slick.css',
        'slick/slick-theme.css'
      ],
      'normalize.css': ['normalize.css']
    }
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src\/)/,
        'js/main.js': /^(src\/.*\.js)/ // as hbs files are considered js, target only real .js
      }
    },
    stylesheets: {
      joinTo: {
        'css/vendor.css': /^node_modules/,
        'css/main.css': /^(src\/)/
      },
      order: {
        before: [/^(src\/styles\/)/]
      }
    }
  },
  plugins: {
    static: {
      processors: [
        require('html-brunch-static')({
          partials: '/src/components?/',
          layouts: '/src/layouts?/',
          handlebars: {
            enableProcessor: true
          },
          processors: [
            require('pug-brunch-static')({
              pretty: true,
              fileMatch: /\.static\.pug$/,
              fileTransform: (filename) => filename.replace(/\.static\.pug$/, '.html')
            })
          ]
        })
      ]
    },
    svgo: {
      plugins: [{
        'removeTitle': true,
        'removeComments': true
      }]
    },
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    },
    babel: {
      presets: ['latest'],
      plugins: ['babel-polyfill']
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 5 versions']),
        require('csswring')
      ]
    }
  }
};
