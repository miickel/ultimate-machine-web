import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import ArticlePreview from "./templates/ArticlePreview.js"
import ProductPreview from "./templates/ProductPreview.js"
import AboutPreview from "./templates/AboutPreview.js"

CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("article", ArticlePreview)
CMS.registerPreviewTemplate("product", ProductPreview)
CMS.registerPreviewTemplate("pages", AboutPreview)
