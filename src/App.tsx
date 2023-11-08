import { useEffect, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';
import MainBlock from './components/MainBlock';
import { AppState } from './types/appState';

const App = () => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 0,
    potatoesPerSec: 0,
    potatoesPerClick: 1,
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
        name: 'shovel',
        image: '../../assets/images/disable_shovel.png',
        upgradeLevel: 0,
      },
      {
        name: 'fertilizer',
        image: '../../assets/images/disable_bone_meal.png',
        upgradeLevel: 0,
      },
      {
        name: 'reaper',
        image: '../../assets/images/disable_potato_reaper.png',
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
    }, 1);

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
