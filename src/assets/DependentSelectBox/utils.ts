import { DATA_DISALLOW_SUBMIT_WHEN_DISABLED } from './constants';
import { ParentValue } from './types';

export const maybeGetNumberValue = (value: string): number | string => {
  const number = Number(value);
  if (!Number.isNaN(number)) return number;
  return value;
};

export const getMultiChoiceValue = (element: HTMLInputElement): ParentValue => {
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

export const isMultiChoice = (element: HTMLInputElement): boolean => {
  if (element.type === 'checkbox') {
    return element.name.includes('[]');
  }
  return element.type === 'radio' || Boolean(element.multiple);
};

export const maybeDisableSubmit = (selectBox: HTMLSelectElement): void => {
  const { form } = selectBox;
  const disallowSubmit = selectBox.getAttribute(
    DATA_DISALLOW_SUBMIT_WHEN_DISABLED,
  );
  if (form && disallowSubmit !== null) {
    for (const input of form.elements as HTMLCollectionOf<HTMLInputElement>) {
      if (input !== (selectBox as HTMLElement)) {
        input.disabled = selectBox.disabled && input.type === 'submit';
      }
    }
  }
};
