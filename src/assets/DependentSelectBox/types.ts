export type DependentSelectBoxes = HTMLSelectElement[];
export type FormElement = HTMLInputElement | null;
export type Parents = Array<string>;
export type ParentValue =
  | Array<number | string>
  | boolean
  | number
  | string
  | null;
export type ParentsValues = Record<string, ParentValue>;
export type Response = Record<string, { disabled: boolean; options: string }>;

export interface Request {
  trigger: string;
  values: ParentsValues;
}

type DependentEvent<T> = CustomEvent<
  {
    form: HTMLFormElement;
    dependentSelectBoxes: DependentSelectBoxes;
  } & T
>;

export type LoadingEvent = DependentEvent<{ request: Request }>;
export type LoadedEvent = DependentEvent<{ response: Response }>;
