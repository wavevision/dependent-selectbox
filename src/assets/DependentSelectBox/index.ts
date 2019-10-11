import {
  DATA_LINK,
  DEPENDENT_SELECT_BOX_SELECTOR,
  EVENT_LOADED,
  EVENT_LOADING,
  PARENT_HAS_EVENT_LISTENER,
  PARENTS_DATA,
} from './constants';
import {
  DependentSelectBoxes,
  Parents,
  ParentsValues,
  ParentValue,
  Response,
} from './types';

class DependentSelectBox {
  public constructor(naja: Naja) {
    this.naja = naja;
    this.naja.addEventListener('load', this.init);
  }

  private naja: Naja;

  public init = (): void => {
    const dependentSelectBoxes = document.querySelectorAll(
      DEPENDENT_SELECT_BOX_SELECTOR,
    ) as NodeListOf<HTMLInputElement>;
    for (const dependentSelectBox of dependentSelectBoxes) {
      const parents = this.getParents(dependentSelectBox);
      parents.forEach(parent => {
        const element = document.getElementById(parent);
        if (
          element &&
          element.getAttribute(PARENT_HAS_EVENT_LISTENER) === null
        ) {
          element.addEventListener(
            'change',
            this.handleChange(parents, dependentSelectBoxes),
          );
          element.setAttribute(PARENT_HAS_EVENT_LISTENER, '');
        }
      });
    }
  };

  public getParents = (dependentSelectBox: HTMLElement): Parents => {
    const parentsData = dependentSelectBox.getAttribute(PARENTS_DATA);
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
      const element = form.elements.namedItem(
        parent,
      ) as HTMLInputElement | null;
      if (element) {
        data[element.name] = this.getParentValue(element);
      }
    }
    return data;
  };

  public getParentValue = (element: HTMLInputElement): ParentValue => {
    if (element.type === 'checkbox') return element.checked;
    const value = element.value.trim();
    if (value === '') return null;
    const number = Number(value);
    if (!Number.isNaN(number)) return number;
    return value;
  };

  public handleChange = (
    parents: Parents,
    dependentSelectBoxes: DependentSelectBoxes,
  ) => (event: Event): void => {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const { form } = input;
    if (!form) return;
    for (const dependentSelectBox of dependentSelectBoxes) {
      if (dependentSelectBox instanceof HTMLSelectElement) {
        const selectBoxParents = this.getParents(dependentSelectBox);
        dependentSelectBox.disabled = selectBoxParents.includes(input.id);
      }
    }
    this.handleRequest(form, dependentSelectBoxes, {
      trigger: input.id,
      data: this.getParentsData(form, parents),
    });
  };

  public handleResponse = (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    response: Response,
  ): void => {
    for (const id in response) {
      const element = document.getElementById(id);
      if (element && element instanceof HTMLSelectElement) {
        element.disabled = response[id].disabled;
        element.innerHTML = response[id].options;
      }
    }
    this.naja.fireEvent(EVENT_LOADED, { form, dependentSelectBoxes });
  };

  public handleRequest = async (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    data: { data: ParentsValues; trigger: string },
  ): Promise<void> => {
    const link = form.getAttribute(DATA_LINK);
    if (!link) return;
    this.naja.fireEvent(EVENT_LOADING, { form, dependentSelectBoxes });
    const response = await this.naja.makeRequest<Response>('POST', link, data, {
      dataType: 'json',
      history: false,
      responseType: 'json',
    });
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default DependentSelectBox;
