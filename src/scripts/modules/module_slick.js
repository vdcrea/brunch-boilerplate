import $ from 'jquery'
import slick from 'slick-carousel'

let ModuleSlick = () => {
  let modules_slick = $('.module_slick')
  if (modules_slick.length) {
    console.log('".module_slick" detected')
    $.each(modules_slick, function (i, module_slick) {
      // find title and inject index of the module
      let carousel = $(module_slick).find('.carousel')
      let $carousel = $(carousel[0])
      $carousel.slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      })
    })
  }
}

module.exports = ModuleSlick
