import DOMManager from '../DOMManager';
import ParentsManager from '../ParentsManager';
import { DATA_LINK, EVENT_LOADING } from '../constants';

import NajaMock from './NajaMock';
import { createParent, createSelectBox } from './utils';

describe('DOMManager', () => {
  const domManager = new DOMManager(NajaMock);
  describe('addListeners', () => {
    it('attaches change event listeners to parent', () => {
      const parent1 = createParent();
      const parent2 = createParent('checkbox');
      const selectBoxes = [createSelectBox()];
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
      parent.name = 'parent-name';
      const selectBox = createSelectBox([parent.id]);
      form.append(parent, selectBox);
      document.body.append(form);
      const event = new Event('change');
      parent.dispatchEvent(event);
      domManager.handleChange([parent.id], [selectBox])(event);
      expect(selectBox.disabled).toBe(true);
      expect(NajaMock.fireEvent).toHaveBeenCalledWith(EVENT_LOADING, {
        data: { trigger: 'parent', values: { 'parent-name': null } },
        form,
        dependentSelectBoxes: [selectBox],
      });
      expect(NajaMock.makeRequest).toHaveBeenCalledTimes(1);
    });
  });
});
