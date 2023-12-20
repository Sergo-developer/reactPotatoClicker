import { useEffect, useRef, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppState, ComputedState } from './types/appState';

import useSound from 'use-sound';
import potatoSound1 from './assets/sounds/potato_1.ogg';
import potatoSound2 from './assets/sounds/potato_2.ogg';
import potatoSound3 from './assets/sounds/potato_3.ogg';

import upgradeSound from './assets/sounds/upgrade_sound_1.ogg';
import finalUpgradeSound from './assets/sounds/upgrade_sound_2.ogg';
import popSound from './assets/sounds/pop.ogg';

import clickerShop1upgrade1 from './assets/images/wooden_hoe.png';
import clickerShop2upgrade1 from './assets/images/farm.png';
import clickerShop3upgrade1 from './assets/images/vitaly.png';

import clickerShop1upgrade2 from './assets/images/iron_hoe.png';
import clickerShop2upgrade2 from './assets/images/farm_iron.png';
import clickerShop3upgrade2 from './assets/images/vitaly_1.png';

import clickerShop1upgrade3 from './assets/images/diamond_hoe.png';
import clickerShop2upgrade3 from './assets/images/diamond_iron.png';
import clickerShop3upgrade3 from './assets/images/vitaly_2.png';

import clickerShop1UpgradeDisable1 from './assets/images/disable_shovel.png';
import clickerShop1Upgrade1 from './assets/images/wooden_shovel.png';
import clickerShop1Upgrade2 from './assets/images/iron_shovel.png';
import clickerShop1Upgrade3 from './assets/images/diamond_shovel.png';

import clickerShopUpgradeDisable2 from './assets/images/disable_bone_meal.png';
import clickerShop2Upgrade1 from './assets/images/bone_meal.png';
import clickerShop2Upgrade2 from './assets/images/fertilizer.png';
import clickerShop2Upgrade3 from './assets/images/fertilizer_2.png';

import clickerShopUpgradeDisable3 from './assets/images/disable_potato_reaper.png';
import clickerShop3Upgrade1 from './assets/images/potato_reaper.png';
import clickerShop3Upgrade2 from './assets/images/iron_potato_reaper.png';
import clickerShop3Upgrade3 from './assets/images/diamond_potato_reaper.png';

const App = () => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 0,
    shop: [
      {
        id: 1,
        name: 'Мотыга',
        image: clickerShop1upgrade1,
        image2: clickerShop1upgrade2,
        image3: clickerShop1upgrade3,
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
        image2: clickerShop2upgrade2,
        image3: clickerShop2upgrade3,
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
        image2: clickerShop3upgrade2,
        image3: clickerShop3upgrade3,
        amount: 0,
        startPotatoPerSec: 100,
        startPrice: 1500,
        priceIncreaseByAmount: 250,
        upgradeLevel: 0,
      },
    ],
    clickShop: [
      {
        id: 1,
        name: 'shovel',
        image: clickerShop1UpgradeDisable1,
        image2: clickerShop1Upgrade1,
        image3: clickerShop1Upgrade2,
        image4: clickerShop1Upgrade3,
        upgradeLevel: 0,
      },
      {
        id: 2,
        name: 'fertilizer',
        image: clickerShopUpgradeDisable2,
        image2: clickerShop2Upgrade1,
        image3: clickerShop2Upgrade2,
        image4: clickerShop2Upgrade3,
        upgradeLevel: 0,
      },
      {
        id: 3,
        name: 'reaper',
        image: clickerShopUpgradeDisable3,
        image2: clickerShop3Upgrade1,
        image3: clickerShop3Upgrade2,
        image4: clickerShop3Upgrade3,
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
      return Math.floor(acc + (newPotatoesPerSecToAdd / 100) * 10 * el.upgradeLevel);
    }, 1);

    setComputedState({
      potatoesPerSec: newPotatoesPerSecToAdd,
      potatoesPerClick: newPotatoesPerClick,
    });
  }, [state]);

  const [OnShopClickSoundPlay] = useSound(popSound);

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
    
    OnShopClickSoundPlay();
  };

  const [playUpgradeSound] = useSound(upgradeSound);
  const [playfinalUpgradeSound] = useSound(finalUpgradeSound);

  const onShopUpgradeClick = (id: number) => {
    const clickedUpgradeElementIndex = state.shop.findIndex((el) => el.id === id);
    const clickedUpgradeElement = state.shop[clickedUpgradeElementIndex];

    if (!clickedUpgradeElement) {
      return;
    }

    const currentPrice =
      1000 * 10 ** (clickedUpgradeElement.id - 1 + clickedUpgradeElement.upgradeLevel);

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

    if (clickedUpgradeElement.upgradeLevel === 1) {
      playfinalUpgradeSound();

      return;
    }

    playUpgradeSound();
  };

  const onClickShopUpgradeClick = (id: number) => {
    const clickedUpgradeElementIndex = state.clickShop.findIndex((el) => el.id === id);
    const clickedUpgradeElement = state.clickShop[clickedUpgradeElementIndex];

    if (!clickedUpgradeElement) {
      return;
    }

    const currentPrice =
      1000 * 10 ** (clickedUpgradeElement.id - 1 + clickedUpgradeElement.upgradeLevel);

    if (state.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = state.totalPotatoes - currentPrice;

    const newUpgradeLevel = clickedUpgradeElement.upgradeLevel + 1;
    const newShopElement = { ...clickedUpgradeElement, upgradeLevel: newUpgradeLevel };
    const newShop = state.clickShop.with(clickedUpgradeElementIndex, newShopElement);

    setState({
      ...state,
      totalPotatoes: newTotalPotatoes,
      clickShop: newShop,
    });

    if (clickedUpgradeElement.upgradeLevel === 2) {
      playfinalUpgradeSound();

      return;
    }

    playUpgradeSound();
  };

  return (
    <>
      <MainBlock state={state} computedState={computedState} onPotatoClick={onPotatoClick} />
      <PotatoShop
        clickShop={state.clickShop}
        totalPotatoes={state.totalPotatoes}
        shop={state.shop}
        onClickShopUpgradeClick={onClickShopUpgradeClick}
        onShopClick={onShopClick}
        onShopUpgradeClick={onShopUpgradeClick}
      />
    </>
  );
};

export default App;
