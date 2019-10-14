import ParentsManager from '../ParentsManager';
import { DATA_PARENTS } from '../constants';

describe('ParentsManager', () => {
  describe('getParents', () => {
    it('returns array of parent IDs', () => {
      const s1 = document.createElement('select');
      s1.setAttribute(DATA_PARENTS, JSON.stringify(['parent']));
      const s2 = document.createElement('select');
      expect(ParentsManager.getParents(s1)).toEqual(['parent']);
      expect(ParentsManager.getParents(s2)).toEqual([]);
    });
  });
  describe('getParentValue', () => {
    it('returns boolean for checkbox', () => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      expect(ParentsManager.getParentValue(checkbox)).toBe(false);
    });
    it('returns null for empty string', () => {
      const input = document.createElement('input');
      input.type = 'text';
      expect(ParentsManager.getParentValue(input)).toBe(null);
    });
    it('returns parsed number', () => {
      const number = document.createElement('input');
      number.type = 'number';
      number.value = '123';
      expect(ParentsManager.getParentValue(number)).toBe(123);
    });
    it('returns text value', () => {
      const text = document.createElement('input');
      text.type = 'text';
      text.value = 'Some text value   ';
      expect(ParentsManager.getParentValue(text)).toBe('Some text value');
    });
  });
  describe('getParentsData', () => {
    it('returns formatted parents values', () => {
      const form = document.createElement('form');
      const parent = document.createElement('input');
      parent.id = 'parent-id';
      parent.name = 'parent-name';
      form.appendChild(parent);
      expect(
        ParentsManager.getParentsData(form, [parent.id, 'undefined-parent']),
      ).toEqual({ [parent.name]: null });
    });
  });
});
