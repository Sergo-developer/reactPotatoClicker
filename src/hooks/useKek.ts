import { useContext } from "react";
import { AppContext } from "./appStateProvider";

const useKek = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useMyState must be used within a MyStateProvider');
  }

  return context;
};

export default useKek;
