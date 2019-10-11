import { FormElement, Parents, ParentsValues, ParentValue } from './types';
import { PARENT_HAS_EVENT_LISTENER, PARENTS_DATA } from './constants';

class ParentsManager {
  public getParents = (selectBox: HTMLElement): Parents => {
    const parentsData = selectBox.getAttribute(PARENTS_DATA);
    if (parentsData) {
      return JSON.parse(parentsData);
    }
    return [];
  };

  public getParentsData = (
    form: HTMLFormElement,
    parents: Parents,
  ): ParentsValues => {
    const data: ParentsValues = {};
    for (const parent of parents) {
      const element = form.elements.namedItem(parent) as FormElement;
      if (element) {
        data[element.name] = this.getParentValue(element);
      }
    }
    return data;
  };

  private getParentValue = (element: HTMLInputElement): ParentValue => {
    if (element.type === 'checkbox') return element.checked;
    const value = element.value.trim();
    if (value === '') return null;
    const number = Number(value);
    if (!Number.isNaN(number)) return number;
    return value;
  };

  public parentHasListener = (parent: HTMLInputElement): boolean =>
    parent.getAttribute(PARENT_HAS_EVENT_LISTENER) !== null;

  public setParentHasListener = (parent: HTMLInputElement): void =>
    parent.setAttribute(PARENT_HAS_EVENT_LISTENER, 'true');
}

export default ParentsManager;
