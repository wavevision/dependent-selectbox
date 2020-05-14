import { DependentSelectBoxes, Parents, Request } from './types';
import ParentsManager from './ParentsManager';

const get = (
  form: HTMLFormElement,
  trigger: HTMLInputElement,
  selectBoxes: DependentSelectBoxes,
  parents: Parents,
): Request => {
  const selectBoxesIds = [];
  for (const selectBox of selectBoxes) {
    if (!parents.includes(selectBox.id)) {
      selectBoxesIds.push(selectBox.id);
    }
  }
  const values = ParentsManager.getParentsData(form, [
    ...parents,
    ...selectBoxesIds,
  ]);
  return { trigger: trigger.id, values };
};

export default { get };
