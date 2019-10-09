// @flow
import { EVENT_LOADED, EVENT_LOADING } from './constants';

export type Parents = Array<string>;

export type ParentValue = boolean | number | string | null;

export type ParentsValues = Record<string, ParentValue>;

export interface Response {
  [id: string]: {
    disabled: boolean;
    options: string;
  };
}

export type DependentSelectBoxes = NodeList<HTMLSelectElement>;

export interface DependentSelectBoxCallbackData {
  form: HTMLFormElement;
  forceSubmit?: boolean;
  dependentSelectBoxes: DependentSelectBoxes;
}

export type DependentSelectBoxCallback = (
  data: DependentSelectBoxCallbackData,
) => any;

export type DependentSelectBoxEventHandler = (
  callback?: DependentSelectBoxCallback,
) => (event: {
  form: HTMLFormElement;
  dependentSelectBoxes: DependentSelectBoxes;
  type: typeof EVENT_LOADED | typeof EVENT_LOADING;
}) => any;

export type DependentHandlerInit = (callbacks: {
  onLoaded?: DependentSelectBoxCallback;
  onLoading?: DependentSelectBoxCallback;
}) => void;
