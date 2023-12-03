import { useEffect, useRef, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppState, ComputedState } from './types/appState';

import useSound from 'use-sound';
import potatoSound1 from './assets/sounds/potato_1.ogg';
import potatoSound2 from './assets/sounds/potato_2.ogg';
import potatoSound3 from './assets/sounds/potato_3.ogg';

import clickerShop1upgrade1 from './assets/images/wooden_hoe.png';
import clickerShop2upgrade1 from './assets/images/farm.png';
import clickerShop3upgrade1 from './assets/images/vitaly.png';

import clickerShop1upgrade2 from './assets/images/iron_hoe.png';
import clickerShop2upgrade2 from './assets/images/farm_iron.png';
import clickerShop3upgrade2 from './assets/images/vitaly_1.png';

import clickerShop1upgrade3 from './assets/images/diamond_hoe.png';
import clickerShop2upgrade3 from './assets/images/diamond_farm.png';
import clickerShop3upgrade3 from './assets/images/vitaly_2.png';

import clickerShopUpgradeDisable1 from './assets/images/disable_shovel.png';
import clickerShopUpgradeDisable2 from './assets/images/disable_bone_meal.png';
import clickerShopUpgradeDisable3 from './assets/images/disable_potato_reaper.png';

const App = () => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 10000000,
    shop: [
      {
        id: 1,
        name: 'Мотыга',
        image: clickerShop1upgrade1,
        amount: 0,
        startPotatoPerSec: 1,
        startPrice: 15,
        priceIncreaseByAmount: 5,
        upgradeLevel: 0,
      },
      {
        id: 2,
        name: 'Ферма',
        image: clickerShop2upgrade1,
        amount: 0,
        startPotatoPerSec: 10,
        startPrice: 150,
        priceIncreaseByAmount: 25,
        upgradeLevel: 0,
      },
      {
        id: 3,
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
        id: 1,
        name: 'shovel',
        image: clickerShopUpgradeDisable1,
        upgradeLevel: 0,
      },
      {
        id: 2,
        name: 'fertilizer',
        image: clickerShopUpgradeDisable2,
        upgradeLevel: 0,
      },
      {
        id: 3,
        name: 'reaper',
        image: clickerShopUpgradeDisable3,
        upgradeLevel: 0,
      },
    ],
    potatoClickSound: [potatoSound1, potatoSound2, potatoSound3],
  });

  const [computedState, setComputedState] = useState<ComputedState>({
    potatoesPerSec: 0,
    potatoesPerClick: 1,
  });

  const computedStateRef = useRef<ComputedState>(computedState);

  const getPotatoClickSound = () => {
    const randomPotatoSoundIndex = Math.floor(Math.random() * state.potatoClickSound.length);

    return state.potatoClickSound[randomPotatoSoundIndex];
  };

  const [playSound] = useSound(getPotatoClickSound());

  const onPotatoClick = () => {
    setState({
      ...state,
      totalPotatoes: computedState.potatoesPerClick + state.totalPotatoes,
    });

    playSound();
  };

  const addPotatoesByTimer = () => {
    setState((prevState) => ({
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
    const newPotatoesPerSecToAdd = state.shop.reduce((acc, el) => {
      return el.startPotatoPerSec * 2 ** el.upgradeLevel * el.amount + acc;
    }, 0);

    const newPotatoesPerClick = state.clickShop.reduce((acc, el) => {
      return acc + el.upgradeLevel;
    }, 1);

    setComputedState({
      potatoesPerSec: newPotatoesPerSecToAdd,
      potatoesPerClick: newPotatoesPerClick,
    });
  }, [state]);

  const onShopClick = (id: number) => {
    const clickedElementIndex = state.shop.findIndex((el) => el.id === id);
    const clickedElement = state.shop[clickedElementIndex];

    if (!clickedElement) {
      return;
    }

    const currentPrice =
      clickedElement.startPrice + clickedElement.priceIncreaseByAmount * clickedElement.amount;

    if (state.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = state.totalPotatoes - currentPrice;
    const newAmount = clickedElement.amount + 1;
    const newShopElement = { ...clickedElement, amount: newAmount };
    const newShop = state.shop.with(clickedElementIndex, newShopElement);

    setState({
      ...state,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });
  };

  const onShopUpgradeClick = (id: number) => {
    const clickedUpgradeElementIndex = state.shop.findIndex((el) => el.id === id);
    const clickedUpgradeElement = state.shop[clickedUpgradeElementIndex];

    if (!clickedUpgradeElement) {
      return;
    }

    const currentPrice = 1000 * 10 ** (clickedUpgradeElement.id - 1 + clickedUpgradeElement.upgradeLevel);

    if (state.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = state.totalPotatoes - currentPrice;
    
    const newUpgradeLevel = clickedUpgradeElement.upgradeLevel + 1;
    const newShopElement = { ...clickedUpgradeElement, upgradeLevel: newUpgradeLevel };
    const newShop = state.shop.with(clickedUpgradeElementIndex, newShopElement);

    setState({
      ...state,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });
  };

  return (
    <>
      <MainBlock state={state} computedState={computedState} onPotatoClick={onPotatoClick} />
      <PotatoShop
        clickShop={state.clickShop}
        shop={state.shop}
        onShopClick={onShopClick}
        onShopUpgradeClick={onShopUpgradeClick}
      />
    </>
  );
};

export default App;
