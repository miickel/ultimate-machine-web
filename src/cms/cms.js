import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import BlogPostPreview from "./templates/BlogPostPreview.js"

CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("blog", BlogPostPreview)
