import {Details} from 'express-useragent';

export * from './cookies';


export type ApiError<T> = T;

export interface AppMetaData {
  description: Nullable<string>;
  metaDescription: Nullable<string>;
  metaTitle: Nullable<string>;
  hasTitleAppend?: boolean;
  image: Nullable<string>;
  robots?: boolean;
  title: Nullable<string>;
}

export interface DeviceInfo extends Details {
  isApp: boolean;
}


