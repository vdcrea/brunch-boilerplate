let displayIndex = (i, module_block) => {
    // find title and inject index of the module
    let moduleTitle = $(module_block).find('.title')
    let $moduleTitle = $(moduleTitle[0])
    let moduleTitleText = $moduleTitle.text()
    let moduleIndex = i + 1;
    $moduleTitle.html(moduleTitleText + '<span class="module-count">' + moduleIndex + '</span>')
}

module.exports = displayIndex
