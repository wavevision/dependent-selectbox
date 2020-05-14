import { Naja } from 'naja';

import ParentsManager from './ParentsManager';
import RequestManager from './RequestManager';
import { DependentSelectBoxes, FormElement, Parents } from './types';
import { SELECT_BOX_SELECTOR } from './constants';
import DataManager from './DataManager';

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
    const trigger = event.target as HTMLInputElement;
    const form = trigger.form as HTMLFormElement;
    for (const selectBox of selectBoxes) {
      const selectBoxParents = ParentsManager.getParents(selectBox);
      selectBox.disabled = selectBoxParents.includes(trigger.id);
    }
    const formSelectBoxes = this.getFormSelectBoxes(form, selectBoxes);
    this.requestManager.handleRequest(
      form,
      formSelectBoxes,
      DataManager.get(form, trigger, formSelectBoxes, parents),
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
