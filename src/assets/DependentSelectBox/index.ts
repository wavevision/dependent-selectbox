import { Extension, Naja } from 'naja';

import DOMManager from './DOMManager';
import ParentsManager from './ParentsManager';
import { DependentSelectBoxes, Parents } from './types';
import { maybeDisableSubmit } from './utils';

class DependentSelectBox implements Extension {
  private domManager: DOMManager;

  public readonly initialize = (naja: Naja): void => {
    this.domManager = new DOMManager(naja);
    naja.addEventListener('init', this.load);
    naja.addEventListener('complete', this.load);
    naja.snippetHandler.addEventListener('afterUpdate', this.load);
  };

  public readonly load = (): void => {
    const selectBoxes = this.domManager.findSelectBoxes();
    for (const selectBox of selectBoxes) {
      const parents = ParentsManager.getParents(selectBox);
      parents.forEach(this.initParent(parents, selectBoxes));
      maybeDisableSubmit(selectBox);
    }
  };

  private readonly initParent = (
    parents: Parents,
    selectBoxes: DependentSelectBoxes,
  ) => (id: string): void => {
    const parent = this.domManager.findParent(id);
    if (parent !== null && !ParentsManager.parentHasListener(parent)) {
      this.domManager.addListeners(parent, parents, selectBoxes);
    }
  };
}

export default DependentSelectBox;
