import { DependentSelectBoxes, ParentsValues, Response } from './types';
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
      const element = document.getElementById(id);
      if (element && element instanceof HTMLSelectElement) {
        element.disabled = response[id].disabled;
        element.innerHTML = response[id].options;
      }
    }
    this.naja.fireEvent(EVENT_LOADED, { form, dependentSelectBoxes });
  };

  public handleRequest = async (
    form: HTMLFormElement,
    dependentSelectBoxes: DependentSelectBoxes,
    data: { data: ParentsValues; trigger: string },
  ): Promise<void> => {
    const link = form.getAttribute(DATA_LINK) as string;
    if (!link) {
      throw new Error(
        `Form ${form.id} must have data-dependent-link attribute!`,
      );
    }
    this.naja.fireEvent(EVENT_LOADING, { form, dependentSelectBoxes });
    const response = await this.naja.makeRequest<Response>('POST', link, data, {
      dataType: 'json',
      history: false,
      responseType: 'json',
    });
    this.handleResponse(form, dependentSelectBoxes, response);
  };
}

export default RequestManager;
