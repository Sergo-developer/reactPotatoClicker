import React, { createContext } from 'react';
import useAppState from './useAppState';
import useComputedState from './useComputedState';
import { AppState, ComputedState } from '../types/appState';

export interface AppContextType{
    appState: AppState;
     setAppState: React.Dispatch<React.SetStateAction<AppState>>;
      computedState: ComputedState;
       setComputedState: React.Dispatch<React.SetStateAction<ComputedState>>;
}
//@ts-ignore
export const AppContext = createContext<AppContextType>();

export const AppContextProvider = ({ children, ...props }: any) => {
  const [appState, setAppState] = useAppState();
  const [computedState, setComputedState] = useComputedState();

  return (
    <AppContext.Provider value={{ appState, setAppState, computedState, setComputedState }}>
      {children}
    </AppContext.Provider>
  );
};
