import ModuleImage from './modules/module_image'
import ModuleBlock from './modules/module_block'
import ModuleSlick from './modules/module_slick'

let Main = {
    init: function init() {
        $(document).ready( () => {
            console.log("DOM Ready")
            ModuleImage()
            ModuleBlock()
            ModuleSlick()
        })
    }
}

module.exports = Main
