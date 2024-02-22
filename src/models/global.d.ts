declare module '*.md' {
  const value: string;
  export default value;
}

// GLOBAL TYPES ------------------------------------------------------------------------------------------
declare interface Window {
  [key: string]: any; // Add index signature
}

declare type Nullable<T> = T | null | undefined;

declare type Diff<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

declare type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type PickPartial<T, K extends keyof T> = T | Pick<T, K>;

declare type Translation = React.ReactNode | string;

declare interface OnClickOutsideFunctionalComponent<P> extends React.FunctionComponent<P> {
  handleClickOutside?: (event?: any) => void;
}

declare type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

declare type PickKey<T, K extends keyof T> = Extract<keyof T, K>;

// ---------------------------------------------------------------------------------------------------------
