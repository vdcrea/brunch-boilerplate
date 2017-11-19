module.exports = () => {
  let anotherButtons = $('.another-button')
  if (anotherButtons.length) {
    for (let anotherButton of anotherButtons) {
      let $anotherButton = $(anotherButton)
      // your jQuery scripts here
    }
  }
}