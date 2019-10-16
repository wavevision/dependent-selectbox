/// <reference types="node" />

import { Naja } from 'naja';

declare class DependentSelectBox {
  constructor(naja: Naja);
  private readonly domManager;
  private readonly naja;
  readonly init: () => void;
  private readonly initParent;
}
export declare const DATA_LINK = 'data-dependent-data-link';
export declare const DATA_PARENT_LISTENER = 'data-has-dependent-listener';
export declare const DATA_PARENTS = 'data-parents';
export declare const DATA_SELECT_BOX = 'data-dependent-select-box';
export declare const EVENT_LOADED = 'dependentSelectBoxLoaded';
export declare const EVENT_LOADING = 'dependentSelectBoxLoading';
export declare const SELECT_BOX_SELECTOR: string;
export declare type DependentSelectBoxes = HTMLSelectElement[];
export declare type FormElement = HTMLInputElement | null;
export declare type Parents = Array<string>;
export declare type ParentValue = boolean | number | string | null;
export declare type ParentsValues = Record<string, ParentValue>;
export declare type Response = Record<
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
export default DependentSelectBox;

export as namespace DependentSelectBox;

export {};
