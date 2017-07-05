import React, { Component, PropTypes, isValidElement } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { assets, component, store, asyncComponentsState, asyncComponentsStateIdentifier } = this.props;

    const content = component ? renderToString(component) : '';
    const head = Helmet.rewind();

    const attrs = head.htmlAttributes.toComponent();

    return (
      <html {...attrs}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        {
          Object.keys(assets.styles).map((style, key) => (
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))
        }
      </head>
      <body>
      <div id="root" dangerouslySetInnerHTML={{__html: content}}></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${serialize(store.getState())};`
        }}
        charSet="UTF-8"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.${asyncComponentsStateIdentifier}=${serialize(asyncComponentsState)};`
        }}
        charSet="UTF-8"
      ></script>
      <script defer src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
      <script defer src={assets.javascript.main}></script>
      </body>
      </html>
    );
  }
}

React.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};

export default Root;
