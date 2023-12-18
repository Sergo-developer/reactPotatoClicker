import { useState } from 'react';
import { ClickShopItem } from '../../types/appState';
import styled from 'styled-components';
// import upgradeIco from '../../assets/images/disable_shovel.png';

type ClickShopElementProps = {
  totalPotatoes: number;
  value: ClickShopItem;
  onClickShopUpgradeClick: (id: number) => void;
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
  text-shadow: black 0 0 10px;
`;

const ClickShopElementPrice = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ClickShopElement = ({
  totalPotatoes,
  value,
  onClickShopUpgradeClick,
}: ClickShopElementProps) => {
  const clickUpgrade = () => {
    if (value.upgradeLevel >= 3) {
      return;
    }

    onClickShopUpgradeClick(value.id);

    if (totalPotatoes < 1000 * 10 ** (value.id - 1 + value.upgradeLevel)) {
      return;
    }

    onCLickIcoChanger();
  };

  const [upgradeIco, setUpgradeIco] = useState({
    shopIco: value.image,
    upgradeLevelPlus: value.upgradeLevel + 1,
  });

  const onCLickIcoChanger = () => {
    if (upgradeIco.upgradeLevelPlus === 1)
      setUpgradeIco({
        shopIco: value.image2,
        upgradeLevelPlus: upgradeIco.upgradeLevelPlus + 1,
      });
    else if (upgradeIco.upgradeLevelPlus === 2)
      setUpgradeIco({
        shopIco: value.image3,
        upgradeLevelPlus: upgradeIco.upgradeLevelPlus + 1,
      });
    else if (upgradeIco.upgradeLevelPlus === 3)
      setUpgradeIco({
        shopIco: value.image4,
        upgradeLevelPlus: upgradeIco.upgradeLevelPlus + 1,
      });
  };

  return (
    <ClickShopImage $image={upgradeIco.shopIco} onClick={clickUpgrade}>
      <>{10 * value.upgradeLevel}%</>
      <ClickShopElementPrice> {10 ** (value.id - 1 + value.upgradeLevel)}k </ClickShopElementPrice>
    </ClickShopImage>
  );
};

export default ClickShopElement;
