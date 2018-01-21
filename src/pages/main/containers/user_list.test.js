import React from 'react';
import { Link } from 'react-router-dom';

import UserList from './user_list';
import { DEFAULT_AVATAR_URL } from '../../../shared/const';
import { mount } from '../../../shared/test_helpers';



describe('UserList', () => {
  describe('list', () => {
    it('shows no user until they are set', () => {
      const component = mount(<UserList />);
      const users = component.find('tr');

      expect(users).toHaveLength(0);
    });

    it('shows users if they are set', () => {
      const component = mount(<UserList />, {
        users: {
          result: [
            { id: 1, name: 'me', avatarUrl: 'a.png' },
            { id: 2, name: 'myself' }
          ],
        },
      });

      const users = component.find('tr');
      expect(users).toHaveLength(2);

      const me = users.at(0);
      expect(me.find('span').text()).toBe('me');
      expect(me.find('a')).toHaveLength(1);
      expect(me.find('a').prop('href')).toBe('/user/1/')
      expect(me.find('img')).toHaveLength(1);
      expect(me.find('img').prop('src')).toBe('a.png');
      expect(me.find('img').prop('alt')).toBe('me');

      const myself = users.at(1);
      expect(myself.find('span').text()).toBe('myself');
      expect(myself.find('a')).toHaveLength(1);
      expect(myself.find('a').prop('href')).toBe('/user/2/')
      expect(myself.find('img')).toHaveLength(1);
      expect(myself.find('img').prop('src')).toBe(DEFAULT_AVATAR_URL);
      expect(myself.find('img').prop('alt')).toBe('myself');
    });
  });

  describe('paging', () => {
    it('shows no paging urls until they are set', () => {
      const component = mount(<UserList />);

      expect(component.find('[key="prev"]')).toHaveLength(0);
    });

    it('shows paging to previous page if it is set', () => {
      const component = mount(<UserList />, {
        users: {
          previousPageUrl: 'prev_url',
        },
      });

      expect(component.find('li')).toHaveLength(1);
      expect(component.find('li').key()).toBe('prev');

      const link = component.find('li').find('Link');
      expect(link.type()).toEqual(Link);
      expect(link.text()).toBe('Previous page');

      const a = component.find('li').find('a');
      expect(a.prop('href')).toBe('/users/prev_url/');
    });

    it('shows paging to next page if it is set', () => {
      const component = mount(<UserList />, {
        users: {
          nextPageUrl: 'next_url',
        },
      });

      expect(component.find('li')).toHaveLength(1);
      expect(component.find('li').key()).toBe('next');

      const link = component.find('li').find('Link');
      expect(link.type()).toEqual(Link);
      expect(link.text()).toBe('Next page');

      const a = component.find('li').find('a');
      expect(a.prop('href')).toBe('/users/next_url/');
    });

    it('shows paging to both prev and next page if they are set', () => {
      const component = mount(<UserList />, {
        users: {
          previousPageUrl: 'prev_url',
          nextPageUrl: 'next_url',
        },
      });

      expect(component.find('li')).toHaveLength(2);

      // prev
      const prev = component.find('li').at(0);
      expect(prev.key()).toBe('prev');

      let link = prev.find('Link');
      expect(link.type()).toEqual(Link);
      expect(link.text()).toBe('Previous page');

      let a = prev.find('a');
      expect(a.prop('href')).toBe('/users/prev_url/');

      // next
      const next = component.find('li').at(1);
      expect(next.key()).toBe('next');

      link = next.find('Link');
      expect(link.type()).toEqual(Link);
      expect(link.text()).toBe('Next page');

      a = next.find('a');
      expect(a.prop('href')).toBe('/users/next_url/');
    });
  });
});
