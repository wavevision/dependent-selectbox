import DependentSelectBox from '../..';

import NajaMock from './NajaMock';
import { createParent, createSelectBox } from './helpers';

describe('DependentSelectBox', () => {
  it('initializes extension', () => {
    const parent = createParent();
    const selectBox = createSelectBox([parent.id, 'undefined-parent']);
    document.body.append(selectBox, parent);
    const extension = new DependentSelectBox();
    extension.initialize(NajaMock);
    expect(extension.load()).toBeUndefined();
  });
});
