// require("prism-themes/themes/prism-material-oceanic.css")

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) import(`intersection-observer`)
}
