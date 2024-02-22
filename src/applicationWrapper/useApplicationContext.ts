import {useContext} from 'react';
import {ApplicationContext, ApplicationContextType} from './applicationContext';

export const useApplicationContext = () => {
  const applicationContext = useContext(ApplicationContext);

  if (!applicationContext?.value) {
    throw new Error('ApplicationContext is not set properly');
  }

  return applicationContext as Required<ApplicationContextType>;
};
