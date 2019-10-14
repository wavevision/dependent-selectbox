import DOMManager from '../DOMManager';
import ParentsManager from '../ParentsManager';
import { DATA_LINK, DATA_PARENTS, DATA_SELECT_BOX } from '../constants';

import NajaMock from './NajaMock';

const createParent = (): HTMLInputElement => {
  const parent = document.createElement('input');
  parent.id = 'parent';
  return parent;
};

const createSelectBox = (): HTMLSelectElement => {
  const selectBox = document.createElement('select');
  selectBox.setAttribute(DATA_SELECT_BOX, '');
  return selectBox;
};

describe('DOMManager', () => {
  const domManager = new DOMManager(NajaMock);
  describe('addListeners', () => {
    it('attaches change event listeners to parent', () => {
      const parent1 = createParent();
      const parent2 = createParent();
      const selectBoxes = [createSelectBox()];
      parent1.type = 'text';
      parent2.type = 'checkbox';
      domManager.addListeners(parent1, [parent1.id, parent2.id], selectBoxes);
      domManager.addListeners(parent2, [parent1.id, parent2.id], selectBoxes);
      expect(ParentsManager.parentHasListener(parent1)).toBe(true);
      expect(ParentsManager.parentHasListener(parent2)).toBe(true);
    });
  });
  describe('findParent', () => {
    it('returns HTMLInputElement or null', () => {
      const parent = createParent();
      document.body.appendChild(parent);
      expect(domManager.findParent(parent.id)).toBe(parent);
    });
  });
  describe('findSelectBoxes', () => {
    it('returns an array of dependent select boxes on page', () => {
      const selectBox = createSelectBox();
      document.body.appendChild(selectBox);
      expect(domManager.findSelectBoxes()).toContain(selectBox);
    });
  });
  describe('handleChange', () => {
    it('handles change event on parent input', () => {
      const form = document.createElement('form');
      form.setAttribute(DATA_LINK, 'some-url');
      const parent = createParent();
      const selectBox = createSelectBox();
      selectBox.setAttribute(DATA_PARENTS, JSON.stringify([parent.id]));
      form.append(parent, selectBox);
      document.body.append(form);
      const event = new Event('change');
      parent.dispatchEvent(event);
      domManager.handleChange([parent.id], [selectBox])(event);
      expect(selectBox.disabled).toBe(true);
      expect(NajaMock.makeRequest).toHaveBeenCalledTimes(1);
    });
  });
});
