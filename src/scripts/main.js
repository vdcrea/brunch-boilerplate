import $ from 'jquery'
import ModuleImage from './modules/module_image'
import ModuleBlock from './modules/module_block'

let Main = {
    init: function init() {
        $(document).ready( () => {
            console.log("DOM Ready")
            ModuleImage()
            ModuleBlock()
        })
    }
}

module.exports = Main
