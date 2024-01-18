import React, { useContext, useEffect } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppContext } from './hooks/appStateProvider';

const App = () => {

  const {appState, setComputedState} = useContext(AppContext);

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
