import $ from 'jquery'

let ModuleBlock = () => {
  let modules_block = $('.module_block')
  if (modules_block.length) {
    console.log('".module_block" detected (' + modules_block.length + ')')

    $.each(modules_block, function (i, module_block) {
      // find title and inject index of the module
      let moduleTitle = $(module_block).find('.title')
      let $moduleTitle = $(moduleTitle[0])
      let moduleTitleText = $moduleTitle.text()
      let moduleIndex = i + 1;
      $moduleTitle.html(moduleTitleText + '<span class="module-count">' + moduleIndex + '</span>')
    })

  }
}

module.exports = ModuleBlock
