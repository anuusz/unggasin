import feather from 'feather-icons'

export function createFeatherIcons(app) {
  // Register global directive
  app.directive('feather', {
    mounted(el) {
      replaceIcon(el)
    },
    updated(el) {
      replaceIcon(el)
    }
  })

  // Register global method (optional)
  app.config.globalProperties.$feather = feather
}

function replaceIcon(el) {
  if (el.hasAttribute('data-feather')) {
    feather.replace({
      'stroke-width': 1.5, // default stroke width
      'width': 24, // default width
      'height': 24 // default height
    })
  }
}
