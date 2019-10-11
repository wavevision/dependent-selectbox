import { DependentSelectBoxes, FormElement, Parents } from './types';
import { DEPENDENT_SELECT_BOX_SELECTOR } from './constants';
import RequestManager from './RequestManager';
import ParentsManager from './ParentsManager';

class DOMManager {
  public constructor(naja: Naja, parentsManager: ParentsManager) {
    this.parentsManager = parentsManager;
    this.requestManager = new RequestManager(naja);
  }

  private parentsManager: ParentsManager;

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
    this.parentsManager.setParentHasListener(parent);
  };

  public findParent = (id: string): FormElement =>
    document.getElementById(id) as FormElement;

  public findSelectBoxes = (): DependentSelectBoxes =>
    document.querySelectorAll(
      DEPENDENT_SELECT_BOX_SELECTOR,
    ) as DependentSelectBoxes;

  public handleChange = (
    parents: Parents,
    selectBoxes: DependentSelectBoxes,
  ) => (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const form = input.form as HTMLFormElement;
    for (const selectBox of selectBoxes) {
      if (selectBox instanceof HTMLSelectElement) {
        const selectBoxParents = this.parentsManager.getParents(selectBox);
        selectBox.disabled = selectBoxParents.includes(input.id);
      }
    }
    this.requestManager.handleRequest(form, selectBoxes, {
      trigger: input.id,
      data: this.parentsManager.getParentsData(form, parents),
    });
  };

  private isParentTextBased = (parent: HTMLInputElement): boolean =>
    ['text', 'number', 'textarea'].includes(parent.type);
}

export default DOMManager;
