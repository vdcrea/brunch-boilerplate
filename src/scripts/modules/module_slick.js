import $ from 'jquery'
import slick from 'slick-carousel'

let ModuleSlick = () => {
  let modules_slick = $('.module_slick')
  if (modules_slick.length) {

    console.log('".module_slick" detected')

    let opts = {
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      pauseOnHover: false
    }

    $.each(modules_slick, function (i, module_slick) {
      let carousel = $(module_slick).find('.carousel')
      let $carousel = $(carousel[0])
      $carousel.slick(opts)
    })

  }
}

module.exports = ModuleSlick
