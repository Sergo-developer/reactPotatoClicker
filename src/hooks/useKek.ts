import { useContext } from "react";
import { AppContext, AppContextType } from "./appStateProvider";

const useKek = () => {
  const context = (useContext(AppContext) as AppContextType);

  if (!context) {
    throw new Error('useMyState must be used within a MyStateProvider');
  }

  return context;
};

export default useKek;
