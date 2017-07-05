import React from 'react';

import Notification from './Notification';
import Icon from '../Icon/Icon';

describe('Notification', () => {
  it('should render', () => {
    const wrapper = mount(
      <Notification />,
    );

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render children', () => {
    const wrapper = mount(
      <Notification>
        Smth text
      </Notification>,
    );

    expect(wrapper.text()).toEqual('Smth text');
  });

  it('should be isClosable', () => {
    const wrapper = mount(
      <Notification isClosable>
        Smth text
      </Notification>,
    );

    expect(wrapper.find(Icon).exists()).toBeTruthy();
  });

  it('check onClick', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <Notification isClosable onClick={onClick}>
        Smth text
      </Notification>,
    );

    wrapper.find(Icon).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render corresponding type', () => {
    const wrapper = shallow(
      <Notification type="info">
        Smth text
      </Notification>,
    );

    expect(wrapper.is('.Info')).toBeTruthy();

    wrapper.setProps({ type: 'error' });
    expect(wrapper.is('.Error')).toBeTruthy();

    wrapper.setProps({ type: 'success' });
    expect(wrapper.is('.Success')).toBeTruthy();
  });

  it('check default props', () => {
    const wrapper = mount(
      <Notification>
        Smth text
      </Notification>,
    );

    expect(wrapper.prop('type')).toEqual('info');
    expect(wrapper.prop('isClosable')).toBeFalsy();
  });
});
