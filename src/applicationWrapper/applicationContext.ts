import React, {createContext} from 'react';
import {Configuration} from "../configuration/model.ts";
import {DeviceInfo} from "../types";


interface ContextValue {
  configuration: Configuration;
  deviceInfo: DeviceInfo;
  versions?: {
    client: string;
    api: string | null;
  };
}
export interface ApplicationContextType {
  setValue: React.Dispatch<React.SetStateAction<ContextValue | undefined>>;
  value?: ContextValue;
}

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);
