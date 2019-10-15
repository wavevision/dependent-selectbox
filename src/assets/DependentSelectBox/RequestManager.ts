import { Naja } from '../types/naja';

import {
  Request,
  DependentSelectBoxes,
  FormElement,
  Response,
  LoadedEvent,
  LoadingEvent,
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
    const e: Partial<LoadedEvent> = { form, dependentSelectBoxes, response };
    this.naja.fireEvent(EVENT_LOADED, e);
  };

  public handleRequest = async (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    data: Request,
  ): Promise<void> => {
    const link = form.getAttribute(DATA_LINK);
    if (!link) {
      throw new Error(
        `Form "${form.id}" must have "data-dependent-data-link" attribute!`,
      );
    }
    const e: Partial<LoadingEvent> = { data, form, dependentSelectBoxes };
    this.naja.fireEvent(EVENT_LOADING, e);
    const response = await this.naja.makeRequest<Response>('POST', link, data, {
      dataType: 'json',
      history: false,
      responseType: 'json',
    });
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default RequestManager;
