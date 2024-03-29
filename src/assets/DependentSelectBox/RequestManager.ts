import { Naja } from 'naja';

import {
  Request,
  DependentSelectBoxes,
  Response,
  LoadingEvent,
  LoadedEvent,
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
    const e: LoadedEvent = new CustomEvent(EVENT_LOADED, {
      detail: { form, dependentSelectBoxes, response },
    });
    this.naja.dispatchEvent(e);
  };

  public handleRequest = async (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    request: Request,
  ): Promise<void> => {
    const link = form.getAttribute(DATA_LINK);
    if (!link) {
      throw new Error(
        `Form "${form.id}" must have "data-dependent-data-link" attribute!`,
      );
    }
    const e: LoadingEvent = new CustomEvent(EVENT_LOADING, {
      detail: { form, dependentSelectBoxes, request },
    });
    this.naja.dispatchEvent(e);
    const response: Response = await this.naja.makeRequest(
      'POST',
      link,
      JSON.stringify(request),
      {
        fetch: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        history: false,
      },
    );
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default RequestManager;
