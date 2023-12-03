import { ShopItem } from '../../types/appState';
import styled from 'styled-components';
import strippedOakLog from '../../assets/images/stripped_oak_log.png';
import testImage from '../../assets/images/Iron_upgrade.png';

type ShopElementProps = {
  value: ShopItem;
  onShopClick: (id: number) => void;
  onShopUpgradeClick: (id: number) => void;
};

const ShopElementWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ShopLeftElement = styled.div`
  background-image: url(${strippedOakLog});
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

const ShopUpgrade = styled.div`
  background-image: url(${testImage});
  border: 5px solid;
  border-color: #584d3b;
  height: 100px;
  width: 100px;
  color: #99ff00;
  text-shadow: black 0 0 10px;
`;

const ShopElement = ({ value, onShopClick, onShopUpgradeClick }: ShopElementProps) => {
  const upgrade = () => {
    if (value.upgradeLevel > 1) {
      return;
    }

    onShopUpgradeClick(value.id)
  };

  return (
    <ShopElementWrapper>
      <ShopLeftElement onClick={() => onShopClick(value.id)}>
        <ShopImage $image={value.image}>
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
      <ShopUpgrade onClick={upgrade}>
        {10 ** (value.id - 1 + value.upgradeLevel)}k
      </ShopUpgrade>
    </ShopElementWrapper>
  );
};

export default ShopElement;
