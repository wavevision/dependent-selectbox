import { Naja } from 'naja';

import ParentsManager from './ParentsManager';
import RequestManager from './RequestManager';
import { DependentSelectBoxes, FormElement, Parents } from './types';
import { SELECT_BOX_SELECTOR } from './constants';

class DOMManager {
  public constructor(naja: Naja) {
    this.requestManager = new RequestManager(naja);
  }

  private requestManager: RequestManager;

  public addListeners = (
    parent: HTMLInputElement,
    parents: Parents,
    selectBoxes: DependentSelectBoxes,
  ): void => {
    const events = ['change'];
    if (this.isParentTextBased(parent)) {
      events.push('keydown');
    }
    events.forEach(e =>
      parent.addEventListener(e, this.handleChange(parents, selectBoxes)),
    );
    ParentsManager.setParentHasListener(parent);
  };

  public findParent = (id: string): FormElement =>
    document.getElementById(id) as FormElement;

  public findSelectBoxes = (): DependentSelectBoxes =>
    Array.from(document.querySelectorAll(SELECT_BOX_SELECTOR));

  public handleChange = (
    parents: Parents,
    selectBoxes: DependentSelectBoxes,
  ) => (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const form = input.form as HTMLFormElement;
    for (const selectBox of selectBoxes) {
      const selectBoxParents = ParentsManager.getParents(selectBox);
      selectBox.disabled = selectBoxParents.includes(input.id);
    }
    this.requestManager.handleRequest(
      form,
      this.getFormSelectBoxes(form, selectBoxes),
      {
        trigger: input.id,
        values: ParentsManager.getParentsData(form, parents),
      },
    );
  };

  private getFormSelectBoxes = (
    form: HTMLFormElement,
    selectBoxes: DependentSelectBoxes,
  ): DependentSelectBoxes => selectBoxes.filter(s => s.form === form);

  private isParentTextBased = (parent: HTMLInputElement): boolean =>
    ['text', 'number', 'textarea'].includes(parent.type);
}

export default DOMManager;
