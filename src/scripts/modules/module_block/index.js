import displayIndex from './display_index'

let ModuleBlock = () => {
  let modules_block = $('.module_block')
  if (modules_block.length) {

    console.log('".module_block" detected (' + modules_block.length + ')')

    $.each(modules_block, (i, module_block) => {
        displayIndex(i, module_block)
    })

  }
}

module.exports = ModuleBlock
