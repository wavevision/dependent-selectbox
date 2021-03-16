import { DependentSelectBoxes, Parents, Request } from './types';
import ParentsManager from './ParentsManager';

const get = (
  form: HTMLFormElement,
  trigger: HTMLInputElement,
  selectBoxes: DependentSelectBoxes,
  parents: Parents,
): Request => {
  const elementIds = [];
  for (const selectBox of selectBoxes) {
    if (!parents.includes(selectBox.id)) elementIds.push(selectBox.id);
    for (const parent of ParentsManager.getParents(selectBox)) {
      if (!elementIds.includes(parent)) elementIds.push(parent);
    }
  }
  const values = ParentsManager.getParentsData(form, [
    ...parents,
    ...elementIds,
  ]);
  return { trigger: trigger.id, values };
};

export default { get };
