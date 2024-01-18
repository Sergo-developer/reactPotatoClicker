import { useEffect, useState } from 'react';
import { ClickShopItem } from '../../types/appState';
import styled from 'styled-components';
import usePotatoSound from '../../hooks/usePotatoSound';
import useKek from '../../hooks/useKek';
// import upgradeIco from '../../assets/images/disable_shovel.png';

type ClickShopElementProps = {
  value: ClickShopItem;
};

const ClickShopImage = styled.div<{ $image: string }>`
  background-image: url(${({ $image }) => $image});
  display: grid;
  height: 100px;
  width: 100px;
  border: 5px solid;
  border-color: #584d3b;
  cursor: pointer;
  margin-left: 10px;
  color: #99ff00;
  text-shadow: black 0 0 3px;
`;

const ClickShopElementPrice = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ClickShopElement = ({ value }: ClickShopElementProps) => {
  const [upgradeIcon, setUpgradeIcon] = useState(value.images[value.upgradeLevel]);
  const {appState, setAppState} = useKek();
  const [price, setPrice] = useState<number>(0);
  const { playUpgradeSound, playFinalUpgradeSound } = usePotatoSound();

  useEffect(() => {
    setUpgradeIcon(value.images[value.upgradeLevel]);
    setPrice(1000 * 10 ** (value.id - 1 + value.upgradeLevel));
  }, [value.upgradeLevel]);

  const onUpgradeClick = () => {
    if (value.upgradeLevel === 3) {
      return;
    }

    const currentPrice = 1000 * 10 ** (value.id - 1 + value.upgradeLevel);

    if (appState.totalPotatoes < currentPrice) {
      return;
    }

    const newTotalPotatoes = appState.totalPotatoes - currentPrice;

    const newUpgradeLevel = value.upgradeLevel + 1;
    const newShopElement = { ...value, upgradeLevel: newUpgradeLevel };
    const newShop = appState.clickShop.with(value.id - 1, newShopElement);

    setAppState({
      ...appState,
      totalPotatoes: newTotalPotatoes,
      clickShop: newShop,
    });

    if (value.upgradeLevel === 2) {
      playFinalUpgradeSound();

      return;
    }

    playUpgradeSound();
  };

  return (
    <ClickShopImage $image={upgradeIcon} onClick={() => onUpgradeClick()}>
      <>{10 * value.upgradeLevel}%</>
      <ClickShopElementPrice>{value.upgradeLevel < 3 ? price : ''}</ClickShopElementPrice>
    </ClickShopImage>
  );
};

export default ClickShopElement;
