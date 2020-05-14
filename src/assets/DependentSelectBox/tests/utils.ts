import { DATA_PARENTS, DATA_SELECT_BOX } from '../constants';
import { Parents } from '../types';

export const createParent = (type = 'text'): HTMLInputElement => {
  const parent = document.createElement('input');
  parent.id = 'parent';
  parent.type = type;
  return parent;
};

export const createSelectBox = (parents?: Parents): HTMLSelectElement => {
  const selectBox = document.createElement('select');
  selectBox.id = 'dependent';
  selectBox.name = selectBox.id;
  selectBox.setAttribute(DATA_SELECT_BOX, '');
  if (parents) selectBox.setAttribute(DATA_PARENTS, JSON.stringify(parents));
  return selectBox;
};
