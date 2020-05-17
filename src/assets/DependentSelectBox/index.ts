import { Naja } from 'naja';

import DOMManager from './DOMManager';
import ParentsManager from './ParentsManager';
import { DependentSelectBoxes, Parents } from './types';
import { maybeDisableSubmit } from './utils';

class DependentSelectBox {
  public constructor(naja: Naja) {
    this.naja = naja;
    this.domManager = new DOMManager(this.naja);
    this.naja.addEventListener('load', this.init);
    this.naja.snippetHandler.addEventListener('afterUpdate', this.init);
  }

  private readonly domManager: DOMManager;

  private readonly naja: Naja;

  public readonly init = (): void => {
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
