import React, { useState } from 'react';
import { ComputedState } from '../types/appState';


const useComputedState = (): [ComputedState, React.Dispatch<React.SetStateAction<ComputedState>>] => {
  const [computedState, setComputedState] = useState<ComputedState>({
    potatoesPerSec: 0,
    potatoesPerClick: 1,
  });

  return [computedState, setComputedState];
};

export default useComputedState;
