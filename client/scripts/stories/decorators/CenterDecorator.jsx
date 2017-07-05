import React from 'react';

const CenterDecorator = story => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <div style={{ margin: '0 auto' }}>
      {story()}
    </div>
  </div>
);

export default CenterDecorator;
