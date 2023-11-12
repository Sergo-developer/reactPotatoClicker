import { useEffect, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppState } from './types/appState';

import clickerShop1upgrade1 from './assets/images/wooden_hoe.png';
import clickerShop2upgrade1 from './assets/images/farm.png';
import clickerShop3upgrade1 from './assets/images/vitaly.png';

import clickerShopUpgradeDisable1 from './assets/images/disable_shovel.png';
import clickerShopUpgradeDisable2 from './assets/images/disable_bone_meal.png';
import clickerShopUpgradeDisable3 from './assets/images/disable_potato_reaper.png';

const App = () => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 0,
    potatoesPerSec: 0,
    potatoesPerClick: 1,
    shop: [
      {
        name: 'Мотыга',
        image: clickerShop1upgrade1,
        amount: 0,
        startPotatoPerSec: 1,
        startPrice: 15,
        priceIncreaseByAmount: 5,
        upgradeLevel: 0,
      },
      {
        name: 'Ферма',
        image: clickerShop2upgrade1,
        amount: 0,
        startPotatoPerSec: 10,
        startPrice: 150,
        priceIncreaseByAmount: 25,
        upgradeLevel: 0,
      },
      {
        name: 'Виталик',
        image: clickerShop3upgrade1,
        amount: 0,
        startPotatoPerSec: 10,
        startPrice: 150,
        priceIncreaseByAmount: 25,
        upgradeLevel: 0,
      },
    ],
    clickShop: [
      {
        name: 'shovel',
        image: clickerShopUpgradeDisable1,
        upgradeLevel: 0,
      },
      {
        name: 'fertilizer',
        image: clickerShopUpgradeDisable2,
        upgradeLevel: 0,
      },
      {
        name: 'reaper',
        image: clickerShopUpgradeDisable3,
        upgradeLevel: 0,
      },
    ],
  });

  const onPotatoClick = () => {
    setState({
      ...state,
      totalPotatoes: state.potatoesPerClick + state.totalPotatoes,
    });
  };

  const addPotatoesByTimer = () => {
    setState((prevState) => ({
      ...prevState,
      totalPotatoes: prevState.potatoesPerSec + prevState.totalPotatoes,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addPotatoesByTimer();
    }, 1000);

    const newPotatoesPerSecToAdd = state.shop.reduce((acc, el) => {
      return el.startPotatoPerSec * 2 ** el.upgradeLevel * el.amount + acc;
    }, 0);

    const newPotatoesPerClick = state.clickShop.reduce((acc, el) => {
      return acc + el.upgradeLevel;
    }, 1);

    setState({
      ...state,
      potatoesPerSec: newPotatoesPerSecToAdd,
      potatoesPerClick: newPotatoesPerClick,
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <MainBlock state={state} onPotatoClick={onPotatoClick} />
      <PotatoShop clickShop={state.clickShop} shop={state.shop} />
    </>
  );
};

export default App;
