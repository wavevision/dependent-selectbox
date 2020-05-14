import { DATA_PARENT_LISTENER, DATA_PARENTS } from './constants';
import { FormElement, Parents, ParentsValues, ParentValue } from './types';

const MULTI_CHOICE = '[]';

const isMultiChoice = (element: HTMLInputElement): boolean => {
  if (element.type === 'checkbox') {
    return element.name.includes(MULTI_CHOICE);
  }
  return element.type === 'radio' || Boolean(element.multiple);
};

const maybeGetNumberValue = (value: string): number | string => {
  const number = Number(value);
  if (!Number.isNaN(number)) return number;
  return value;
};

const getMultiChoiceValue = (element: HTMLInputElement): ParentValue => {
  const value: ParentValue = [];
  if (element instanceof HTMLSelectElement) {
    for (const option of element.selectedOptions) {
      value.push(maybeGetNumberValue(option.value));
    }
  }
  if (['checkbox', 'radio'].includes(element.type)) {
    const inputs = document.querySelectorAll(
      `input[name="${element.name}"]`,
    ) as NodeListOf<HTMLInputElement>;
    for (const input of inputs) {
      if (input.checked) value.push(maybeGetNumberValue(input.value));
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
  if (isMultiChoice(element)) return getMultiChoiceValue(element);
  if (element.type === 'checkbox') return element.checked;
  const value = element.value.trim();
  if (element.type === 'textarea') return value;
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
      const name = element.name.replace(MULTI_CHOICE, '');
      data[name] = getParentValue(element);
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
