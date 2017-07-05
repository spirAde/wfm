import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

class CardPreviewPage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <Helmet title="Card Preview" />
        CardPreviewPage
      </div>
    );
  }
}

CardPreviewPage.displayName = 'CardPreviewPage';

CardPreviewPage.propTypes = {
  dispatch: PropTypes.func,
};

CardPreviewPage.defaultProps = {
  dispatch: Function.prototype,
};

export default CardPreviewPage;
