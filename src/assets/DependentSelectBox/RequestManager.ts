import { Naja } from '../types/naja';

import {
  DependentSelectBoxes,
  FormElement,
  ParentsValues,
  Response,
} from './types';
import {
  DATA_LINK,
  DATA_SELECT_BOX,
  EVENT_LOADED,
  EVENT_LOADING,
} from './constants';

class RequestManager {
  public constructor(naja: Naja) {
    this.naja = naja;
  }

  private naja: Naja;

  public handleResponse = (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    response: Response,
  ): void => {
    for (const id in response) {
      const element = document.getElementById(id) as FormElement;
      if (element && element.getAttribute(DATA_SELECT_BOX) !== null) {
        element.disabled = response[id].disabled;
        element.innerHTML = response[id].options;
      }
    }
    this.naja.fireEvent(EVENT_LOADED, { form, dependentSelectBoxes });
  };

  public handleRequest = async (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    data: { trigger: string; values: ParentsValues },
  ): Promise<void> => {
    const link = form.getAttribute(DATA_LINK);
    if (!link) {
      throw new Error(
        `Form "${form.id}" must have "data-dependent-data-link" attribute!`,
      );
    }
    this.naja.fireEvent(EVENT_LOADING, {
      data,
      form,
      dependentSelectBoxes,
    });
    const response = await this.naja.makeRequest<Response>('POST', link, data, {
      dataType: 'json',
      history: false,
      responseType: 'json',
    });
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default RequestManager;
