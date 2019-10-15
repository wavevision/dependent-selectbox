// Generated by dts-bundle v0.7.3

export const DATA_LINK = 'data-dependent-data-link';
export const DATA_PARENT_LISTENER = 'data-has-dependent-listener';
export const DATA_PARENTS = 'data-parents';
export const DATA_SELECT_BOX = 'data-dependent-select-box';
export const EVENT_LOADED = 'dependentSelectBoxLoaded';
export const EVENT_LOADING = 'dependentSelectBoxLoading';
export const SELECT_BOX_SELECTOR: string;

export type DependentSelectBoxes = HTMLSelectElement[];
export type FormElement = HTMLInputElement | null;
export type Parents = Array<string>;
export type ParentValue = boolean | number | string | null;
export type ParentsValues = Record<string, ParentValue>;
export type Response = Record<
  string,
  {
    disabled: boolean;
    options: string;
  }
>;
export interface Request {
  trigger: string;
  values: ParentsValues;
}
export interface DependentEvent extends Event {
  form: HTMLFormElement;
  dependentSelectBoxes: DependentSelectBoxes;
}
export interface LoadingEvent extends DependentEvent {
  data: Request;
  type: typeof EVENT_LOADING;
}
export interface LoadedEvent extends DependentEvent {
  response: Response;
  type: typeof EVENT_LOADED;
}

class DependentSelectBox {
  constructor(naja: Naja);
  init: () => void;
}
export default DependentSelectBox;

class NajaExtension {
  constructor(naja: Naja, ...optionalArguments: any);
}

export interface NajaDefaultOptions {
  selector: { name: string; query: string };
}

export interface Naja {
  readonly addEventListener: (event: string, callback: Function) => void;
  defaultOptions: NajaDefaultOptions;
  readonly fireEvent: (event: string, args: any) => void;
  formsHandler: {
    netteForms: {
      readonly validateForm: (
        form: HTMLFormElement,
        checkOnly?: boolean,
      ) => boolean;
    };
  };
  readonly initialize: (defaultOptions: NajaDefaultOptions | void) => void;
  readonly makeRequest: <T extends Object>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    data: null | string | number | [] | Object | ArrayBuffer | Blob | FormData,
    options: Object | null,
  ) => Promise<T>;
  readonly registerExtension: (
    extension: typeof NajaExtension,
    ...optionalArguments: any
  ) => void;
  readonly snippetHandler: {
    addEventListener: (
      event: string,
      callback: (event: { snippet: Node }) => void,
    ) => any;
  };
  readonly uiHandler: {
    readonly clickElement: (element: HTMLElement) => void;
    selector: string;
    readonly submitForm: (form: HTMLFormElement) => void;
  };
}
