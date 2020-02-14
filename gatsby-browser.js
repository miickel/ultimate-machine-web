require("typeface-merriweather")
require("typeface-source-code-pro")

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) import(`intersection-observer`)
}
