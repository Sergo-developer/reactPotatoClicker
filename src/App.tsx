import React, { useEffect, useRef } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { ComputedState } from './types/appState';
import useKek from './hooks/useKek';

const App = () => {
  const { appState, setAppState, computedState, setComputedState } = useKek();
  const computedStateRef = useRef<ComputedState>(computedState);

  const addPotatoesByTimer = () => {
    setAppState((prevState) => ({
      ...prevState,
      totalPotatoes: computedStateRef.current.potatoesPerSec + prevState.totalPotatoes,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addPotatoesByTimer();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    computedStateRef.current = computedState;
  }, [computedState]);

  useEffect(() => {
    const newPotatoesPerSecToAdd = appState.shop.reduce((acc, el) => {
      return el.startPotatoPerSec * 2 ** el.upgradeLevel * el.amount + acc;
    }, 0);

    const newPotatoesPerClick = appState.clickShop.reduce((acc, el) => {
      return Math.floor(acc + (newPotatoesPerSecToAdd / 100) * 10 * el.upgradeLevel);
    }, 1);

    setComputedState({
      potatoesPerSec: newPotatoesPerSecToAdd,
      potatoesPerClick: newPotatoesPerClick,
    });
  }, [appState]);

  return (
    <>
      <MainBlock />
      <PotatoShop />
    </>
  );
};

export default App;
