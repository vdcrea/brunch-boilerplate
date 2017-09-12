import slick from 'slick-carousel'

let carouselComponent = () => {
    let carousels = $('.carousel')

    let opts = {
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      pauseOnHover: false
    }

    if (carousels.length) {
        for (let carousel of carousels) {
            $(carousel).slick(opts)
        }
    }
}

module.exports = carouselComponent
