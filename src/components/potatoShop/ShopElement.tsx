import { ShopItem } from '../../types/appState';
import styled from 'styled-components';

import strippedOakLog from '../../assets/images/stripped_oak_log.png';
import ironBlock from '../../assets/images/iron_block.png';
import diamondBlock from '../../assets/images/diamond_block.png';

import upgradeButtonImage1 from '../../assets/images/Iron_upgrade.png';
import upgradeButtonImage2 from '../../assets/images/diamond_upgrade.png';
import upgradeButtonImage3 from '../../assets/images/last_upgrade.png';

import { useEffect, useState } from 'react';
import usePotatoSound from '../../hooks/usePotatoSound';
import useKek from '../../hooks/useKek';

type ShopElementProps = {
  value: ShopItem;
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
  text-shadow: black 0 0 3px;
  text-align: left;
`;

const ShopUpgrade = styled.div<{ $buttonImage: string }>`
  background-image: url(${({ $buttonImage }) => $buttonImage});
  border: 5px solid;
  border-color: #584d3b;
  height: 100px;
  width: 100px;
  color: #99ff00;
  text-shadow: black 0 0 3px;
  cursor: pointer;
`;

const backgroundIcons = [strippedOakLog, ironBlock, diamondBlock];
const upgradeIcons = [upgradeButtonImage1, upgradeButtonImage2, upgradeButtonImage3];

const ShopElement = ({ value }: ShopElementProps) => {
  const [elementIcon, setElementIcon] = useState(value.images[value.upgradeLevel]);

  const [upgradeBackgroundIcon, setUpgradeBackgroundIcon] = useState(
    backgroundIcons[value.upgradeLevel],
  );

  const [upgradeIcon, setUpgradeIcon] = useState(upgradeIcons[value.upgradeLevel]);
  const {appState, setAppState} = useKek();
  const [price, setPrice] = useState<number>(0);
  const { playUpgradeSound, playFinalUpgradeSound, playShopBuySound } = usePotatoSound();

  useEffect(() => {
    setElementIcon(value.images[value.upgradeLevel]);
    setUpgradeBackgroundIcon(backgroundIcons[value.upgradeLevel]);
    setUpgradeIcon(upgradeIcons[value.upgradeLevel]);

    setPrice(1000 * 10 ** (value.id - 1 + value.upgradeLevel));
  }, [value.upgradeLevel, value.images, value.id]);

  const onUpgradeClick = () => {
    if (value.upgradeLevel === 2) {
      return;
    }

    const currentPrice = 1000 * 10 ** (value.id - 1 + value.upgradeLevel);

    if (appState.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = appState.totalPotatoes - currentPrice;

    const newUpgradeLevel = value.upgradeLevel + 1;
    const newShopElement = { ...value, upgradeLevel: newUpgradeLevel };
    const newShop = appState.shop.with(value.id - 1, newShopElement);

    setAppState({
      ...appState,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });

    if (value.upgradeLevel === 1) {
      playFinalUpgradeSound();

      return;
    }

    playUpgradeSound();
  };

  const onShopClick = () => {
    const currentPrice = value.startPrice + value.priceIncreaseByAmount * value.amount;

    if (appState.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = appState.totalPotatoes - currentPrice;
    const newAmount = value.amount + 1;
    const newShopElement = { ...value, amount: newAmount };
    const newShop = appState.shop.with(value.id - 1, newShopElement);

    setAppState({
      ...appState,
      totalPotatoes: newTotalPotatoes,
      shop: newShop,
    });

    playShopBuySound();
  };

  return (
    <ShopElementWrapper>
      <ShopLeftElement $backgroundImage={upgradeBackgroundIcon} onClick={() => onShopClick()}>
        <ShopImage $image={elementIcon}>
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
      <ShopUpgrade $buttonImage={upgradeIcon} onClick={onUpgradeClick}>
        {value.upgradeLevel < 3 ? price : ''}
      </ShopUpgrade>
    </ShopElementWrapper>
  );
};

export default ShopElement;
