import naja from 'naja';

import DependentSelectBox from './DependentSelectBox';

naja.registerExtension(new DependentSelectBox());

document.addEventListener('DOMContentLoaded', naja.initialize.bind(naja));
