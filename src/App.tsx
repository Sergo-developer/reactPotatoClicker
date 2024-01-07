import { useEffect } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import useAppState from './hooks/useAppState';

import useComputedState from './hooks/useComputedState';
import usePotatoSound from './hooks/usePotatoSound';

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

  const onShopClick = (id: number) => {
    const clickedElementIndex = appState.shop.findIndex((el) => el.id === id);
    const clickedElement = appState.shop[clickedElementIndex];

    if (!clickedElement) {
      return;
    }

    const currentPrice =
      clickedElement.startPrice + clickedElement.priceIncreaseByAmount * clickedElement.amount;

    if (appState.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = appState.totalPotatoes - currentPrice;
    const newAmount = clickedElement.amount + 1;
    const newShopElement = { ...clickedElement, amount: newAmount };
    const newShop = appState.shop.with(clickedElementIndex, newShopElement);

    setAppState({
      ...appState,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });

    shopBuy();
  };

  const onShopUpgradeClick = (id: number) => {
    const clickedUpgradeElementIndex = appState.shop.findIndex((el) => el.id === id);
    const clickedUpgradeElement = appState.shop[clickedUpgradeElementIndex];

    if (!clickedUpgradeElement) {
      return;
    }

    const currentPrice =
      1000 * 10 ** (clickedUpgradeElement.id - 1 + clickedUpgradeElement.upgradeLevel);

    if (appState.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = appState.totalPotatoes - currentPrice;

    const newUpgradeLevel = clickedUpgradeElement.upgradeLevel + 1;
    const newShopElement = { ...clickedUpgradeElement, upgradeLevel: newUpgradeLevel };
    const newShop = appState.shop.with(clickedUpgradeElementIndex, newShopElement);

    setAppState({
      ...appState,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });

    if (clickedUpgradeElement.upgradeLevel === 1) {
      finalUpgrade();

      return;
    }

    upgrade();
  };

  return (
    <>
      <MainBlock />
      <PotatoShop />
    </>
  );
};

export default App;
