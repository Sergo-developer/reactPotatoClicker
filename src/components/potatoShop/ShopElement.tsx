import { ShopItem } from '../../types/appState';
import styled from 'styled-components';

import strippedOakLog from '../../assets/images/stripped_oak_log.png';
import ironBlock from '../../assets/images/iron_block.png';
import diamondBlock from '../../assets/images/diamond_block.png';

import upgradeButtonImage from '../../assets/images/Iron_upgrade.png';
import upgradeButtonImage2 from '../../assets/images/diamond_upgrade.png';
import upgradeButtonImage3 from '../../assets/images/last_upgrade.png';

import { useState } from 'react';

type ShopElementProps = {
  totalPotatoes: number;
  value: ShopItem;
  onShopClick: (id: number) => void;
  onShopUpgradeClick: (id: number) => void;
};

const ShopElementWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ShopLeftElement = styled.div<{ $backgroundImage: string }>`
  background-image: url(${({ $backgroundImage }) => $backgroundImage});
  align-items: center;
  display: grid;
  grid-template-areas: 'a b c d';
  height: 100px;
  width: 90%;
  border: 5px solid;
  border-color: #584d3b;
  cursor: pointer;
  margin-left: 10px;
  text-align: center;
`;

const ShopImage = styled.div<{ $image: string }>`
  background-image: url(${({ $image }) => $image});
  height: 100px;
  width: 100px;
  color: #99ff00;
  text-shadow: black 0 0 10px;
  text-align: left;
`;

const ShopUpgrade = styled.div<{ $buttonImage: string }>`
  background-image: url(${({ $buttonImage }) => $buttonImage});
  border: 5px solid;
  border-color: #584d3b;
  height: 100px;
  width: 100px;
  color: #99ff00;
  text-shadow: black 0 0 10px;
  cursor: pointer;
`;

const ShopElement = ({
  totalPotatoes,
  value,
  onShopClick,
  onShopUpgradeClick,
}: ShopElementProps) => {
  const upgrade = () => {
    if (value.upgradeLevel > 1) {
      return;
    }

    onShopUpgradeClick(value.id);

    if (totalPotatoes < 1000 * 10 ** (value.id - 1 + value.upgradeLevel)) {
      return;
    }

    onCLickIcoChanger();
  };

  const [upgradeIco, setUpgradeIco] = useState({
    shopIco: value.image,
    upgradeButtonIco: upgradeButtonImage,
    upgradeBackgroundIco: strippedOakLog,
    upgradeLevelPlus: value.upgradeLevel + 1,
  });

  const onCLickIcoChanger = () => {
    if (upgradeIco.upgradeLevelPlus === 1)
      setUpgradeIco({
        shopIco: value.image2,
        upgradeButtonIco: upgradeButtonImage2,
        upgradeBackgroundIco: ironBlock,
        upgradeLevelPlus: upgradeIco.upgradeLevelPlus + 1,
      });
    else if (upgradeIco.upgradeLevelPlus === 2)
      setUpgradeIco({
        shopIco: value.image3,
        upgradeButtonIco: upgradeButtonImage3,
        upgradeBackgroundIco: diamondBlock,
        upgradeLevelPlus: upgradeIco.upgradeLevelPlus + 1,
      });
  };

  return (
    <ShopElementWrapper>
      <ShopLeftElement
        $backgroundImage={upgradeIco.upgradeBackgroundIco}
        onClick={() => onShopClick(value.id)}
      >
        <ShopImage $image={upgradeIco.shopIco}>
          {value.startPotatoPerSec * 2 ** value.upgradeLevel * value.amount}
        </ShopImage>
        <div>
          <h3>{value.name}</h3>
        </div>
        <div>
          <h3>Цена</h3>
          {value.priceIncreaseByAmount * value.amount + value.startPrice}
        </div>
        <div>
          <h3>Количество</h3>
          {value.amount}
        </div>
      </ShopLeftElement>
      <ShopUpgrade $buttonImage={upgradeIco.upgradeButtonIco} onClick={upgrade}>
        {10 ** (value.id - 1 + value.upgradeLevel)}k
      </ShopUpgrade>
    </ShopElementWrapper>
  );
};

export default ShopElement;
