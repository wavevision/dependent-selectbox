import ParentsManager from '../ParentsManager';

import { createParent, createSelectBox } from './utils';

describe('ParentsManager', () => {
  describe('getParents', () => {
    it('returns array of parent IDs', () => {
      const parents = ['parent'];
      expect(ParentsManager.getParents(createSelectBox(parents))).toEqual(
        parents,
      );
      expect(ParentsManager.getParents(createSelectBox())).toEqual([]);
    });
  });
  describe('getParentValue', () => {
    it('returns boolean for checkbox', () => {
      expect(ParentsManager.getParentValue(createParent('checkbox'))).toBe(
        false,
      );
    });
    it('returns null for empty string', () => {
      expect(ParentsManager.getParentValue(createParent())).toBe(null);
    });
    it('returns parsed number', () => {
      const number = createParent('number');
      number.value = '123';
      expect(ParentsManager.getParentValue(number)).toBe(123);
    });
    it('returns text value', () => {
      const text = createParent();
      text.value = 'Some text value   ';
      expect(ParentsManager.getParentValue(text)).toBe('Some text value');
    });
  });
  describe('getParentsData', () => {
    it('returns formatted parents values', () => {
      const form = document.createElement('form');
      const parent = createParent();
      parent.name = 'parent-name';
      form.appendChild(parent);
      expect(
        ParentsManager.getParentsData(form, [parent.id, 'undefined-parent']),
      ).toEqual({ [parent.name]: null });
    });
  });
});
