// generate components files and folders
// from an image folder

// config
const artworksDir = './artworks/';
const componentsDir = './src/components/';

// dependencies
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const camelize = require('camelize');
const files = fs.readdirSync(artworksDir);
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
const createFileIfInexist = function createFileIfInexist(path, data) {
  fs.stat(path, function(err, fileStat) {
    if (err) {
      if (err.code == 'ENOENT') {
        // does not exist
        fs.writeFile(path, data, function(err) {
          if (err) throw err;
        });
      }
    }
    // else {
    //   if (fileStat.isFile()) {
    //     console.log('File found.');
    //   } else if (fileStat.isDirectory()) {
    //     console.log('Directory found.');
    //   }
    // }
  });
}
const copyFile = function copyFile(source, target, cb) {
  var cbCalled = false;
  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);
  function done(err) {
    if (!cbCalled && cb) {
      cb(err);
      cbCalled = true;
    }
  }
}

// templates
const templateFile = function(componentName) {
  return componentName + '.static.pug';
};
const templateData = function(componentName) {
  return '.' + componentName + '\n  //- your pug markup here';
};
const styleFile = function(componentName) {
  return componentName + '.styl'
};
const styleData = function(componentName) {
  return `// path to variables and mixins
@import '../../variables'
@import '../../mixins'

.` + componentName + `
  // your styles here`;
};
const scriptData = function(componentName) {
  const camelized = camelize(componentName);
  const componentsVar = camelized + 's';
  return `module.exports = () => {
  let ` + componentsVar + ` = $('.` + componentName + `')
  if (` + componentsVar + `.length) {
    for (let ` + camelized + ` of ` + componentsVar + `) {
      let $` + camelized + ` = $(` + camelized + `)
      // your jQuery scripts here
    }
  }
}`;
};

const componentsCollection = [];

// loop through artworks and create folders
for (let file of files) {

  const fileExt = path.extname(file);
  const baseName = path.basename(file, fileExt);
  let componentName;
  let componentVersion = {};

  // get component version info
  let splitName = baseName.split('-');
  let version = Number(splitName[splitName.length - 1]);
  if (isNaN(version)) {
    componentName = slugify(baseName);
  } else {
    // remove version from filename
    splitName.pop();
    componentName = slugify(splitName.join('-'));
    componentVersion.number = version;
  }
  // is component already in collection?
  let component = componentsCollection.filter((o) => {
    return o.name == componentName;
  });

  if (fileExt === '.jpg' || fileExt === '.png' ) {
    componentVersion.artwork = file;
    if (component.length) {
      component = component[0];
      component.versions.push(componentVersion);
    } else {
      // no component found, add it to collection
      component = {};
      component.name = componentName;
      component.versions = [componentVersion];
      component.notes = [];
      componentsCollection.push(component);
    }
  } else if (fileExt === '.md' || fileExt === '.txt' ) {
    if (component.length) {
      component = component[0];
      component.notes.push(file);
    } else {
      // no component found, add it to collection
      component = {};
      component.name = componentName;
      component.notes = [file];
      componentsCollection.push(component);
    }
  }
}

for (let component of componentsCollection) {
  // create component folder
  const componentPath = componentsDir + component.name + '/';
  const componentArtworkPath = componentPath + 'design/';
  mkdirSync(componentPath);
  mkdirSync(componentArtworkPath);
  // move artworks to component folder
  for (let version of component.versions) {
    copyFile(artworksDir + version.artwork, componentArtworkPath + version.artwork);
  }
  // compile notes in readme.md
  let readmeData = '';
  let i = 0;
  for (let note of component.notes) {
    try {
      var data = fs.readFileSync(artworksDir + note, 'utf8');
      readmeData += data;
    } catch(e) {
      console.log('Error:', e.stack);
    }
  }
  if (readmeData.length) {
    fs.writeFile(componentArtworkPath + 'readme.md', readmeData, function(err) {
      if (err) throw err;
    });
  }
  // create template files if doesn't exists
  const componentScriptFile = componentPath + 'index.js';
  const componentScriptData = scriptData(component.name);
  createFileIfInexist(componentScriptFile, componentScriptData);
  const componentStyleFile = componentPath + styleFile(component.name);
  const componentStyleData = styleData(component.name);
  createFileIfInexist(componentStyleFile, componentStyleData);
  const componentTemplateFile = componentPath + templateFile(component.name);
  const componentTemplateData = templateData(component.name);
  createFileIfInexist(componentTemplateFile, componentTemplateData);
}

console.log('Components prepared successfully');
