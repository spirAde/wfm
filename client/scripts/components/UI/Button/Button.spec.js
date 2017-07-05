import React from 'react';

import Button from './Button';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';

describe('Button', () => {
  describe('primary', () => {
    it('should render label', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button label={label} />,
      );

      expect(wrapper.find('.Label').text()).toBe(label);
    });

    it('should render label with right icon', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          icon="arrow-right"
          iconAlign="right"
        />,
      );

      // left icon - label - right icon(last)
      expect(wrapper.find('.Inner').children().last().is(Icon)).toBeTruthy();
    });

    it('should render label with left icon', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          icon="arrow-left"
          iconAlign="left"
        />,
      );

      // left icon(first) - label - right icon
      expect(wrapper.find('.Inner').children().first().is(Icon)).toBeTruthy();
    });

    it('should render disabled', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          isDisabled
        />,
      );

      expect(wrapper.find('button').props('disabled')).toBeTruthy();
      expect(wrapper.is('.Disabled')).toBeTruthy();
    });

    it('should not dispatch click event for disabled', () => {
      const label = 'Sign In';
      const onClick = jest.fn();

      const wrapper = shallow(
        <Button
          label={label}
          onClick={onClick}
          isDisabled
        />,
      );

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('should render loading', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          isLoading
        />,
      );

      expect(wrapper.find('button').props('disabled')).toBeTruthy();
      expect(wrapper.is('.Disabled')).toBeTruthy();
      expect(wrapper.find(Spinner)).toBeTruthy();
    });

    it('should not dispatch click event for loading', () => {
      const label = 'Sign In';
      const onClick = jest.fn();

      const wrapper = shallow(
        <Button
          label={label}
          onClick={onClick}
          isLoading
        />,
      );

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('should dispatch onClick', () => {
      const label = 'Sign In';
      const onClick = jest.fn();

      const wrapper = shallow(
        <Button
          label={label}
          onClick={onClick}
        />,
      );

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('secondary', () => {
    it('should render label', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button label={label} kind="secondary" />,
      );

      expect(wrapper.find('.Label').text()).toBe(label);
    });

    it('should render label with right icon', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          kind="secondary"
          icon="arrow-right"
          iconAlign="right"
        />,
      );

      // left icon - label - right icon(last)
      expect(wrapper.find('.Inner').children().last().is(Icon)).toBeTruthy();
    });

    it('should render label with left icon', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          kind="secondary"
          icon="arrow-left"
          iconAlign="left"
        />,
      );

      // left icon(first) - label - right icon
      expect(wrapper.find('.Inner').children().first().is(Icon)).toBeTruthy();
    });

    it('should render disabled', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button
          label={label}
          kind="secondary"
          isDisabled
        />,
      );

      expect(wrapper.find('button').props('disabled')).toBeTruthy();
      expect(wrapper.is('.Disabled')).toBeTruthy();
    });

    it('should not dispatch click event for disabled', () => {
      const label = 'Sign In';
      const onClick = jest.fn();

      const wrapper = shallow(
        <Button
          label={label}
          kind="secondary"
          onClick={onClick}
          isDisabled
        />,
      );

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('link', () => {
    it('should render', () => {
      const label = 'Sign In';

      const wrapper = shallow(
        <Button label={label} kind="link" icon="arrow-left" iconAlign="left" />,
      );

      expect(wrapper.find('.Label').text()).toBe(label);
      expect(wrapper.find(Icon).prop('icon')).toBe('arrow-left');
    });

    it('should dispatch onClick', () => {
      const label = 'Sign In';
      const onClick = jest.fn();

      const wrapper = shallow(
        <Button
          label={label}
          kind="link"
          onClick={onClick}
        />,
      );

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
