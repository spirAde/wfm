import React from 'react';

import Hint from './Hint';

describe('Hint', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Hint>
        <div>asd</div>
      </Hint>,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(Hint);
  });
});
