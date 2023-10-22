import { useEffect, useState } from 'react';
import './App.css';
import PotatoShop from './components/PotatoShop';

const App = () => {
  const [state, setState] = useState({
    totalPotatoes: 0,
    shop: [
      {
        name: 'hoe',
        image: '',
        amount: 1,
        startPotatoPerSec: 1,
        startPrice: 15,
        priceIncreaseByAmount: 5,
        upgradeLevel: 2,
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
  });

  const addPotatoesPerSec = () => {
    const newTotalPotatoes = state.shop.reduce((acc, el) => {
      return el.startPotatoPerSec * 2 ** el.upgradeLevel * el.amount + acc;
    }, 0);
    console.log(state.totalPotatoes);

    const newState = {
      ...state,
      totalPotatoes: newTotalPotatoes + state.totalPotatoes,
    };

    setState(newState);
  };

  useEffect(() => {
    setInterval(() => {
      console.log('1');
      addPotatoesPerSec();
    }, 1000);
  }, []);

  return (
    <>
      <div className='main-block'>
        <div className='total-potatoes'>{state.totalPotatoes}</div>
        <div className='potatoes-per-sec'></div>
        <div className='potato'></div>
        <div className='potatoes-per-click'></div>
      </div>
      <PotatoShop></PotatoShop>
    </>
  );
};

export default App;
