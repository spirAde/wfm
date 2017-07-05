import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
}

  render() {
    return (
      <div>
        <Helmet title="Profile" />
        ProfilePage
      </div>
    );
  }
}

ProfilePage.displayName = 'ProfilePage';

ProfilePage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
};

ProfilePage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default ProfilePage;
