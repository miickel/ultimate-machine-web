import React from 'react'
import PropTypes from 'prop-types'

export default function HTML({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  postBodyComponents,
  body,
}) {
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes} className="theme--light">
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              window.onThemeChange = function() {};

              function _setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.className = newTheme;
                window.onThemeChange(newTheme);
              }

              var preferredTheme;
              var lsKey = 'um-theme';

              try {
                preferredTheme = localStorage.getItem(lsKey);
              } catch (err) { }

              window.setTheme = function(newTheme) {
                _setTheme(newTheme);
                try {
                  localStorage.setItem(lsKey, newTheme);
                } catch (err) {}
              }

              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

              darkQuery.addListener(function(e) {
                window.setTheme(e.matches ? 'theme--dark' : 'theme--light')
              });

              _setTheme(preferredTheme || (darkQuery.matches ? 'theme--dark' : 'theme--light'));
            })();
          `,
          }}
        />
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{__html: body}}
        />
        {postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
