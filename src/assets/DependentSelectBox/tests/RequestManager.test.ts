import RequestManager from '../RequestManager';
import { EVENT_LOADED } from '../constants';

import NajaMock from './NajaMock';
import { createSelectBox } from './utils';

describe('RequestManager', () => {
  const requestManager = new RequestManager(NajaMock);
  describe('handleResponse', () => {
    it('sets received values and fires Naja event', () => {
      const form = document.createElement('form');
      const selectBox = createSelectBox();
      selectBox.id = 'select-box';
      form.appendChild(selectBox);
      document.body.appendChild(form);
      const response = {
        [selectBox.id]: {
          disabled: true,
          options: '<option>--Some prompt--</option>',
        },
        'undefined-selectbox': { disabled: true, options: '' },
      };
      requestManager.handleResponse(form, [selectBox], response);
      expect(selectBox.disabled).toBe(true);
      expect(selectBox.firstChild).toBeInstanceOf(HTMLOptionElement);
      expect(NajaMock.fireEvent).toHaveBeenCalledWith(EVENT_LOADED, {
        form,
        dependentSelectBoxes: [selectBox],
      });
    });
  });
  describe('handleRequest', () => {
    it('throws error', async () => {
      await expect(
        requestManager.handleRequest(
          document.createElement('form'),
          [document.createElement('select')],
          { data: {}, trigger: '' },
        ),
      ).rejects.toThrow(
        'Form "" must have "data-dependent-data-link" attribute!',
      );
    });
  });
});