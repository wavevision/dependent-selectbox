import DOMManager from './DOMManager';
import ParentsManager from './ParentsManager';
import { DependentSelectBoxes, Parents } from './types';

class DependentSelectBox {
  public constructor(naja: Naja) {
    this.naja = naja;
    this.parentsManager = new ParentsManager();
    this.domManager = new DOMManager(this.naja, this.parentsManager);
    this.naja.addEventListener('load', this.init);
  }

  private readonly domManager: DOMManager;

  private readonly naja: Naja;

  private readonly parentsManager: ParentsManager;

  public init = (): void => {
    const selectBoxes = this.domManager.findSelectBoxes();
    for (const selectBox of selectBoxes) {
      const parents = this.parentsManager.getParents(selectBox);
      parents.forEach(this.initParent(parents, selectBoxes));
    }
  };

  private initParent = (
    parents: Parents,
    selectBoxes: DependentSelectBoxes,
  ) => (id: string): void => {
    const parent = this.domManager.findParent(id);
    if (parent !== null && !this.parentsManager.parentHasListener(parent)) {
      this.domManager.addListeners(parent, parents, selectBoxes);
    }
  };
}

export default DependentSelectBox;
