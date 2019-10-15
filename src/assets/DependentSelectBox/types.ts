import { EVENT_LOADED, EVENT_LOADING } from './constants';

export type DependentSelectBoxes = HTMLSelectElement[];
export type FormElement = HTMLInputElement | null;
export type Parents = Array<string>;
export type ParentValue = boolean | number | string | null;
export type ParentsValues = Record<string, ParentValue>;
export type Response = Record<string, { disabled: boolean; options: string }>;

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
