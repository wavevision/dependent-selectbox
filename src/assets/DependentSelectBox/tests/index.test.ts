import DependentSelectBox from '../index';
import { DATA_PARENTS, DATA_SELECT_BOX } from '../constants';

import NajaMock from './NajaMock';

describe('DependentSelectBox', () => {
  it('initializes extension', () => {
    const selectBox = document.createElement('select');
    selectBox.setAttribute(DATA_SELECT_BOX, '');
    const parent = document.createElement('input');
    parent.id = 'parent';
    parent.type = 'text';
    selectBox.setAttribute(
      DATA_PARENTS,
      JSON.stringify([parent.id, 'undefined-parent']),
    );
    document.body.append(selectBox, parent);
    const extension = new DependentSelectBox(NajaMock);
    expect(extension.init()).toBeUndefined();
  });
});
