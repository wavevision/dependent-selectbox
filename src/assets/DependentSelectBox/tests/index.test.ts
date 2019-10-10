/* eslint @typescript-eslint/ban-ts-ignore: 'off' */
import { PARENTS_DATA } from '../constants';

import NajaMock from './NajaMock';

import DependentSelectBox from '..';

const createForm = (...elements: HTMLInputElement[]): HTMLFormElement => {
  const form = document.createElement('form');
  elements.forEach(e => form.appendChild(e));
  return form;
};

const createFormElement = (
  type: string,
  name: string,
  value: string,
): HTMLInputElement => {
  const element = document.createElement('input');
  element.type = type;
  element.name = name;
  element.value = value;
  if (type === 'checkbox') {
    element.checked = true;
  }
  return element;
};

describe('NajaExtensions/DependentSelectBoxExtension', () => {
  const extension = new DependentSelectBox(NajaMock);
  describe('handleChange', () => {
    it('cancels request', () => {
      // @ts-ignore
      expect(extension.handleChange([], [])({})).toBeUndefined();
      // @ts-ignore eslint-disable-line
      expect(extension.handleChange([], [])({ target: {} })).toBeUndefined();
    });
  });
  describe('getParents', () => {
    it('returns empty array', () => {
      const element = document.createElement('select');
      expect(extension.getParents(element)).toEqual([]);
    });
    it('returns array of IDs', () => {
      const element = document.createElement('select');
      element.setAttribute(PARENTS_DATA, JSON.stringify(['parent-id']));
      expect(extension.getParents(element)).toEqual(['parent-id']);
    });
  });
  describe('getParentsData', () => {
    it('returns data object', () => {
      const form = createForm(
        createFormElement('text', 'first', ''),
        createFormElement('checkbox', 'second', 'on'),
        createFormElement('number', 'third', '123'),
        createFormElement('text', 'fourth', 'something '),
      );
      expect(
        extension.getParentsData(form, [
          'first',
          'second',
          'third',
          'fourth',
          'fifth',
          'excluded',
        ]),
      ).toEqual({
        first: null,
        second: true,
        third: 123,
        fourth: 'something',
      });
    });
  });
});
