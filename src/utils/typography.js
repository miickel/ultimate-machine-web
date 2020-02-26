import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideStyles = () => ({
  a: {
    color: 'var(--colorAnchorFg)',
  },
  'a:hover': {
    color: 'var(--colorAnchorHoverFg)',
  },
  // gatsby-remark-autolink-headers:
  'a.anchor': {
    boxShadow: 'none',
  },
  h1: {
    lineHeight: 1.5,
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography({
  ...Wordpress2016,
})

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
