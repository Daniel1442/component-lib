import {Configuration} from './model';
import {useApplicationContext} from "../applicationWrapper/useApplicationContext.ts";

/**
 * Gets App Final Configuration.
 *
 * @returns Configuration object
 */
export const useConfiguration = (): Configuration => {
  const applicationContext = useApplicationContext();
  return applicationContext.value.configuration;
};
