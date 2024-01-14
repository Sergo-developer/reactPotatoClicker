import { useEffect } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import useAppState from './hooks/useAppState';

import useComputedState from './hooks/useComputedState';

const App = () => {
  const [appState, setAppState] = useAppState();
  const [computedState, setComputedState] = useComputedState();

  const addPotatoesByTimer = () => {
    setAppState((prevState) => ({
      ...prevState,
      totalPotatoes: computedState.potatoesPerSec + prevState.totalPotatoes,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addPotatoesByTimer();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
