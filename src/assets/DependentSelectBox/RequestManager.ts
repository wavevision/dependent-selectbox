import { Naja } from 'naja';

import {
  Request,
  DependentSelectBoxes,
  Response,
  LoadedEvent,
  LoadingEvent,
} from './types';
import { maybeDisableSubmit } from './utils';
import { DATA_LINK, EVENT_LOADED, EVENT_LOADING } from './constants';

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
      const element = document.getElementById(id) as HTMLSelectElement;
      element.disabled = response[id].disabled;
      element.innerHTML = response[id].options;
      maybeDisableSubmit(element);
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
    const response: Response = await this.naja.makeRequest('POST', link, data, {
      dataType: 'json',
      history: false,
      responseType: 'json',
    });
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default RequestManager;
