import React from 'react';

import SubHeading from './SubHeading';

describe('SubHeading', () => {
  it('should render', () => {
    const wrapper = shallow(
      <SubHeading />,
    );

    expect(wrapper).not.toBeNull();
  });
});
