module.exports = () => {

    let navs = $('.nav')

    if (navs.length) {
        for (let nav of navs) {

            let $nav = $(nav)
            let links = $nav.find('.nav-link')

            for (let link of links) {
                let url = $(link).attr('href')
                if (url != '/') url = '/' + url
                if (url == window.location.pathname) {
                    $(link).addClass('active')
                }
            }

        }
    }
}
