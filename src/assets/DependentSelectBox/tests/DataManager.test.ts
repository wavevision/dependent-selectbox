import DataManager from '../DataManager';

import { createSelectBox } from './helpers';

describe('DataManager', () => {
  describe('get', () => {
    it('returns data for request', () => {
      const select = createSelectBox();
      expect(
        DataManager.get(
          document.createElement('form'),
          document.createElement('input'),
          [select],
          [select.id],
        ),
      ).toEqual({ trigger: '', values: {} });
    });
  });
});
