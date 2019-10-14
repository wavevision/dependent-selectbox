import DependentSelectBox from '../index';

import NajaMock from './NajaMock';
import { createParent, createSelectBox } from './utils';

describe('DependentSelectBox', () => {
  it('initializes extension', () => {
    const parent = createParent();
    const selectBox = createSelectBox([parent.id, 'undefined-parent']);
    document.body.append(selectBox, parent);
    const extension = new DependentSelectBox(NajaMock);
    expect(extension.init()).toBeUndefined();
  });
});
