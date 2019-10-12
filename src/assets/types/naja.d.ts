declare class NajaExtension {
  public constructor(naja: Naja, ...optionalArguments: any);
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
