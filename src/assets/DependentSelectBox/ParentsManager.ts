import { DATA_PARENT_LISTENER, DATA_PARENTS } from './constants';
import { FormElement, Parents, ParentsValues, ParentValue } from './types';

const isMultiChoiceParent = (element: HTMLElement): boolean => {
  if (element instanceof HTMLSelectElement) {
    return element.multiple;
  }
  if (element instanceof HTMLInputElement && element.type === 'checkbox') {
    return element.name.includes('[]');
  }
  return false;
};

const maybeGetNumberValue = (value: string): number | string => {
  const number = Number(value);
  if (!Number.isNaN(number)) return number;
  return value;
};

const getMultiChoiceParentValue = (element: HTMLElement): ParentValue => {
  const value: ParentValue = [];
  if (element instanceof HTMLSelectElement) {
    for (const option of element.selectedOptions) {
      value.push(maybeGetNumberValue(option.value));
    }
  }
  if (element instanceof HTMLInputElement) {
    const checkboxes = document.querySelectorAll(
      `input[name="${element.name}"]`,
    ) as NodeListOf<HTMLInputElement>;
    for (const checkbox of checkboxes) {
      if (checkbox.checked) value.push(maybeGetNumberValue(checkbox.value));
    }
  }
  return value.length ? value : null;
};

const getParents = (selectBox: HTMLElement): Parents => {
  const parentsData = selectBox.getAttribute(DATA_PARENTS);
  if (parentsData) {
    return JSON.parse(parentsData);
  }
  return [];
};

const getParentValue = (element: HTMLInputElement): ParentValue => {
  if (isMultiChoiceParent(element)) {
    return getMultiChoiceParentValue(element);
  }
  if (['checkbox', 'radio'].includes(element.type)) {
    return element.checked;
  }
  const value = element.value.trim();
  if (value === '') return null;
  return maybeGetNumberValue(value);
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
