module.exports = () => {

    const nav = $('#nav')

    if (nav.length) {

        const links = $(nav).find('.nav-link')

        for (let link of links) {
            let url = $(link).attr('href')
            if (url != '/') url = '/' + url
            if (url == window.location.pathname) {
                $(link).addClass('active')
            }
        }

    }
}
