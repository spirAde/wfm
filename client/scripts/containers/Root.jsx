import React, { PropTypes } from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const Root = ({ store, routes, history }) => {
  const handleUpdateRouter = () => window.scrollTo(0, 0);

  return (
    <AppContainer>
      <Provider store={store} key="provider">
        <Router routes={routes} history={history} onUpdate={handleUpdateRouter} />
      </Provider>
    </AppContainer>
  );
};

Root.displayName = 'Root';

Root.propTypes = {
  store: PropTypes.object,
  routes: PropTypes.object,
  history: PropTypes.object,
};

export default Root;
