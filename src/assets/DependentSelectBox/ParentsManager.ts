import { DATA_PARENT_LISTENER, DATA_PARENTS } from './constants';
import { FormElement, Parents, ParentsValues, ParentValue } from './types';

const getParents = (selectBox: HTMLElement): Parents => {
  const parentsData = selectBox.getAttribute(DATA_PARENTS);
  if (parentsData) {
    return JSON.parse(parentsData);
  }
  return [];
};

const getParentValue = (element: HTMLInputElement): ParentValue => {
  if (element.type === 'checkbox') return element.checked;
  const value = element.value.trim();
  if (value === '') return null;
  const number = Number(value);
  if (!Number.isNaN(number)) return number;
  return value;
};

const getParentsData = (
  form: HTMLFormElement,
  parents: Parents,
): ParentsValues => {
  const data: ParentsValues = {};
  for (const parent of parents) {
    const element = form.elements.namedItem(parent) as FormElement;
    if (element) {
      data[element.name] = getParentValue(element);
    }
  }
  return data;
};

const parentHasListener = (parent: HTMLInputElement): boolean =>
  parent.getAttribute(DATA_PARENT_LISTENER) !== null;

const setParentHasListener = (parent: HTMLInputElement): void =>
  parent.setAttribute(DATA_PARENT_LISTENER, 'true');

export default {
  getParents,
  getParentValue,
  getParentsData,
  parentHasListener,
  setParentHasListener,
};
