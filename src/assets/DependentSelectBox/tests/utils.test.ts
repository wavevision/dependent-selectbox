import { DATA_DISALLOW_SUBMIT_WHEN_DISABLED } from '../constants';
import { maybeDisableSubmit } from '../utils';

import { createSelectBox } from './helpers';

describe('utils', () => {
  describe('maybeDisableSubmit', () => {
    it('disables submit', () => {
      const form = document.createElement('form');
      const select = createSelectBox();
      select.setAttribute(DATA_DISALLOW_SUBMIT_WHEN_DISABLED, '');
      select.disabled = true;
      const submit = document.createElement('input');
      submit.type = 'submit';
      form.append(select, submit);
      expect(submit.disabled).toBe(false);
      maybeDisableSubmit(select);
      expect(submit.disabled).toBe(true);
    });
  });
});
