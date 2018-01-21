import React from 'react';
import { Link } from 'react-router-dom';

import User from './user';
import { DEFAULT_AVATAR_URL } from '../../../shared/const';
import { mount, shallow } from '../../../shared/test_helpers';



describe('User', () => {
  it('does not show the form on component mount', () => {
    const component = mount(<User />);

    expect(component.find('User').text()).toBe('Loading');
  });

  it('does not show the form if tried to get user but it was not found', () => {
    const component = mount(<User dataArrived={true} />);

    expect(component.find('User').text()).toBe('User was not found');
  });

  it('shows form with user when user is provided', () => {
    const component = mount(<User dataArrived={true} />, {
      user: { id: 1, name: 'name', avatarUrl: 'a.png' }
    });

    const form = component.find('User').find('Form');
    expect(form).toHaveLength(1);
    expect(form.find('img')).toHaveLength(1);
    expect(form.find('img').prop('src')).toBe('a.png');
    expect(form.find('Control')).toHaveLength(1);
    expect(form.find('Control').prop('model')).toBe('local.name');
    expect(form.find('Errors')).toHaveLength(1);
    expect(form.find('Errors').prop('model')).toBe('local.name');
    expect(form.find('[type="submit"]')).toHaveLength(1);
  });

  it('shows default avatar if avatarUrl is empty', () => {
    const component = mount(<User dataArrived={true} />, {
      user: { id: 1, name: 'name', avatarUrl: '' }
    });

    const form = component.find('User').find('Form');
    expect(form).toHaveLength(1);
    expect(form.find('img')).toHaveLength(1);
    expect(form.find('img').prop('src')).toBe(DEFAULT_AVATAR_URL);
  });

  it('displays error when input is empty after user blur the input', () => {
    const component = mount(<User dataArrived={true} />, {
      user: { id: 1, name: 'name', avatarUrl: 'a.png' }
    });
    const form = component.find('User').find('Form');
    expect(form).toHaveLength(1);
    expect(form.find('Control input')).toHaveLength(1);
    expect(form.find('Errors')).toHaveLength(1);
    expect(form.find('Errors').html()).toBeNull();

    form.find('Control input').simulate('focus');
    form.find('Control input').simulate('change', {target: {name: "pollName", value: ""}});
    form.find('Control input').simulate('blur');

    expect(form.find('Errors').text()).toBe('Cannot be empty');
  });
});
