// eslint-disable-next-line
// @ts-ignore
import naja from 'naja';

import DependentSelectBox from './DependentSelectBox';

naja.registerExtension(DependentSelectBox);

document.addEventListener('DOMContentLoaded', () => naja.initialize());
