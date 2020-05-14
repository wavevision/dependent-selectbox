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
    it('returns array for mutli choice parent', () => {
      const check1 = createParent('checkbox');
      check1.name = 'check[]';
      check1.value = 'one';
      const check2 = createParent('checkbox');
      check2.name = 'check[]';
      check2.checked = true;
      check2.value = 'two';
      document.body.appendChild(check1);
      document.body.appendChild(check2);
      expect(ParentsManager.getParentValue(check1)).toEqual(['two']);
      expect(ParentsManager.getParentValue(check2)).toEqual(['two']);
    });
  });
  describe('getParentsData', () => {
    it('returns formatted parents values', () => {
      const form = document.createElement('form');
      const parent = createParent();
      parent.name = 'parent-name';
      const select = document.createElement('select');
      select.id = 'multi';
      select.name = select.id;
      select.multiple = true;
      select.add(document.createElement('option'));
      const selected = document.createElement('option');
      selected.value = '1';
      selected.selected = true;
      select.add(selected);
      const empty = document.createElement('select');
      empty.multiple = true;
      empty.id = 'empty';
      empty.name = empty.id;
      empty.add(document.createElement('option'));
      form.appendChild(empty);
      form.appendChild(parent);
      form.appendChild(select);
      expect(
        ParentsManager.getParentsData(form, [
          empty.id,
          parent.id,
          select.id,
          'undefined-parent',
        ]),
      ).toEqual({
        [empty.name]: null,
        [parent.name]: null,
        [select.name]: [1],
      });
    });
  });
});
