import React from "react"

import Layout from "../components/Layout.js"
import SEO from "../components/SEO.js"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Not Found</h1>
    <p>
      The page you are looking for does not exist on this address. Please
      double-check, triple-check and then contact me if you think something is
      missing here!
    </p>
    <p>Sorry for the inconvenience.</p>
  </Layout>
)

export default NotFoundPage
