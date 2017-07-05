import React from 'react';

import Modal from './Modal';
import Icon from '../Icon/Icon';

describe('Modal', () => {
  it('should render', () => {
    const wrapper = mount(
      <Modal />,
    );

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should be closable modal', () => {
    const wrapper = shallow(
      <Modal isClosable />,
    );

    expect(wrapper.find(Icon).exists()).toBeTruthy();
  });

  it('check onHide event by click', () => {
    const onHide = jest.fn();

    const wrapper = shallow(
      <Modal isClosable onHide={onHide} />,
    );

    wrapper.find(Icon).parent().simulate('click');

    expect(onHide).toHaveBeenCalledTimes(1);
  });
});
