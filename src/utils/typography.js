import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideStyles = () => ({
  a: {
    color: "var(--colorAnchorFg)",
  },
  // gatsby-remark-autolink-headers:
  "a.anchor": {
    boxShadow: "none",
  },
})

const typography = new Typography(Wordpress2016)

export default typography
