import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import { Button } from '../../components/UI';

class DocuSignPage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClick(event) {
    event.preventDefault();

    this.props.router.push('/dashboard');
  }

  render() {
    return (
      <div>
        <Helmet title="Confirm & Sign" />
        <Button
          label="Go to dashboard"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

DocuSignPage.diplayName = 'DocuSignPage';

DocuSignPage.propTypes = {};

DocuSignPage.defaultProps = {};

export default DocuSignPage;
