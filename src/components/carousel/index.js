import slick from 'slick-carousel'

module.exports = () => {

    const carousels = $('.carousel')

    const opts = {
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
