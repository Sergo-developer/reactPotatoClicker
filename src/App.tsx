import { useEffect, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppState } from './types/appState';

const App = () => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 0,
    shop: [
      {
        name: 'hoe',
        image: '',
        amount: 0,
        startPotatoPerSec: 1,
        startPrice: 15,
        priceIncreaseByAmount: 5,
        upgradeLevel: 0,
      },
      {
        name: 'farm',
        image: '',
        amount: 0,
        startPotatoPerSec: 10,
        startPrice: 150,
        priceIncreaseByAmount: 25,
        upgradeLevel: 0,
      },
    ],
    clickShop: [
      {
        name: '',
        image: '',
        upgradeLevel: 0,
      },
    ],
  });

  const [potatoesPerSec, setPotatoesPerSec] = useState<number>(0);
  const [potatoesPerClick, setPotatoesPerClick] = useState<number>(1);

  const recountPotatoes = () => {
    const newPotatoesPerSecToAdd = state.shop.reduce((acc, el) => {
      return el.startPotatoPerSec * 2 ** el.upgradeLevel * el.amount + acc;
    }, 0);

    const newPotatoesPerClick = state.clickShop.reduce((acc, el) => {
      return acc + el.upgradeLevel;
    }, 1);

    setPotatoesPerSec(newPotatoesPerSecToAdd);
    setPotatoesPerClick(newPotatoesPerClick);

    setState((prevState) => ({
      ...prevState,
      totalPotatoes: newPotatoesPerSecToAdd + prevState.totalPotatoes,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      recountPotatoes();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <MainBlock
        state={state}
        potatoesPerSec={potatoesPerSec}
        potatoesPerClick={potatoesPerClick}
      />
      <PotatoShop />
    </>
  );
};

export default App;
