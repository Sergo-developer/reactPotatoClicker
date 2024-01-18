import React, { useState } from 'react';

import clickerShop1upgrade1 from '../assets/images/wooden_hoe.png';
import clickerShop2upgrade1 from '../assets/images/farm.png';
import clickerShop3upgrade1 from '../assets/images/vitaly.png';

import clickerShop1upgrade2 from '../assets/images/iron_hoe.png';
import clickerShop2upgrade2 from '../assets/images/farm_iron.png';
import clickerShop3upgrade2 from '../assets/images/vitaly_1.png';

import clickerShop1upgrade3 from '../assets/images/diamond_hoe.png';
import clickerShop2upgrade3 from '../assets/images/diamond_iron.png';
import clickerShop3upgrade3 from '../assets/images/vitaly_2.png';

import clickerShop1UpgradeDisable1 from '../assets/images/disable_shovel.png';
import clickerShop1Upgrade1 from '../assets/images/wooden_shovel.png';
import clickerShop1Upgrade2 from '../assets/images/iron_shovel.png';
import clickerShop1Upgrade3 from '../assets/images/diamond_shovel.png';

import clickerShopUpgradeDisable2 from '../assets/images/disable_bone_meal.png';
import clickerShop2Upgrade1 from '../assets/images/bone_meal.png';
import clickerShop2Upgrade2 from '../assets/images/fertilizer.png';
import clickerShop2Upgrade3 from '../assets/images/fertilizer_2.png';

import clickerShopUpgradeDisable3 from '../assets/images/disable_potato_reaper.png';
import clickerShop3Upgrade1 from '../assets/images/potato_reaper.png';
import clickerShop3Upgrade2 from '../assets/images/iron_potato_reaper.png';
import clickerShop3Upgrade3 from '../assets/images/diamond_potato_reaper.png';
import { AppState } from '../types/appState';

const useAppState = (): [AppState, React.Dispatch<React.SetStateAction<AppState>>] => {
  const [state, setState] = useState<AppState>({
    totalPotatoes: 0,
    shop: [
      {
        id: 1,
        name: 'Мотыга',
        images: [clickerShop1upgrade1, clickerShop1upgrade2, clickerShop1upgrade3],
        amount: 0,
        startPotatoPerSec: 1,
        startPrice: 15,
        priceIncreaseByAmount: 5,
        upgradeLevel: 0,
      },
      {
        id: 2,
        name: 'Ферма',
        images: [clickerShop2upgrade1, clickerShop2upgrade2, clickerShop2upgrade3],
        amount: 0,
        startPotatoPerSec: 10,
        startPrice: 150,
        priceIncreaseByAmount: 25,
        upgradeLevel: 0,
      },
      {
        id: 3,
        name: 'Виталик',
        images: [clickerShop3upgrade1, clickerShop3upgrade2, clickerShop3upgrade3],
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
        images: [
          clickerShop1UpgradeDisable1,
          clickerShop1Upgrade1,
          clickerShop1Upgrade2,
          clickerShop1Upgrade3,
        ],
        upgradeLevel: 0,
      },
      {
        id: 2,
        name: 'fertilizer',
        images: [
          clickerShopUpgradeDisable2,
          clickerShop2Upgrade1,
          clickerShop2Upgrade2,
          clickerShop2Upgrade3,
        ],
        upgradeLevel: 0,
      },
      {
        id: 3,
        name: 'reaper',
        images: [
          clickerShopUpgradeDisable3,
          clickerShop3Upgrade1,
          clickerShop3Upgrade2,
          clickerShop3Upgrade3,
        ],
        upgradeLevel: 0,
      },
    ],
  });

  return [state, setState];
};

export default useAppState;