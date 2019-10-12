export type DependentSelectBoxes = HTMLSelectElement[];
export type FormElement = HTMLInputElement | null;
export type Parents = Array<string>;
export type ParentsValues = Record<string, ParentValue>;
export type ParentValue = boolean | number | string | null;
export type Response = Record<string, { disabled: boolean; options: string }>;
