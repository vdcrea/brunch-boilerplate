(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/scripts/main.js", function(exports, require, module) {
'use strict';

var _module_image = require('./modules/module_image');

var _module_image2 = _interopRequireDefault(_module_image);

var _module_block = require('./modules/module_block');

var _module_block2 = _interopRequireDefault(_module_block);

var _module_slick = require('./modules/module_slick');

var _module_slick2 = _interopRequireDefault(_module_slick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = {
    init: function init() {
        $(document).ready(function () {
            console.log("DOM Ready");
            (0, _module_image2.default)();
            (0, _module_block2.default)();
            (0, _module_slick2.default)();
        });
    }
};

module.exports = Main;

});

require.register("src/scripts/modules/module_block/display_index.js", function(exports, require, module) {
'use strict';

var displayIndex = function displayIndex(i, module_block) {
    // find title and inject index of the module
    var moduleTitle = $(module_block).find('.title');
    var $moduleTitle = $(moduleTitle[0]);
    var moduleTitleText = $moduleTitle.text();
    var moduleIndex = i + 1;
    $moduleTitle.html(moduleTitleText + '<span class="module-count">' + moduleIndex + '</span>');
};

module.exports = displayIndex;

});

require.register("src/scripts/modules/module_block/index.js", function(exports, require, module) {
'use strict';

var _display_index = require('./display_index');

var _display_index2 = _interopRequireDefault(_display_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModuleBlock = function ModuleBlock() {
  var modules_block = $('.module_block');
  if (modules_block.length) {

    console.log('".module_block" detected (' + modules_block.length + ')');

    $.each(modules_block, function (i, module_block) {
      (0, _display_index2.default)(i, module_block);
    });
  }
};

module.exports = ModuleBlock;

});

require.register("src/scripts/modules/module_image.js", function(exports, require, module) {
'use strict';

var ModuleImage = function ModuleImage() {
  var modules_image = $('.module_image');
  if (modules_image.length) {
    console.log('".module_image" detected');
  }
};

module.exports = ModuleImage;

});

require.register("src/scripts/modules/module_slick.js", function(exports, require, module) {
'use strict';

var _slickCarousel = require('slick-carousel');

var _slickCarousel2 = _interopRequireDefault(_slickCarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModuleSlick = function ModuleSlick() {
  var modules_slick = $('.module_slick');
  if (modules_slick.length) {

    console.log('".module_slick" detected');

    var opts = {
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      pauseOnHover: false
    };

    $.each(modules_slick, function (i, module_slick) {
      var carousel = $(module_slick).find('.carousel');
      var $carousel = $(carousel[0]);
      $carousel.slick(opts);
    });
  }
};

module.exports = ModuleSlick;

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=main.js.map