import styled from 'styled-components';
import { ShopItem } from '../../types/appState';
import ShopElement from './ShopElement';

type ShopProps = {
  shop: ShopItem[];
  onShopClick: (id: number) => void;
  onShopUpgradeClick: (id: number) => void;
};

const ShopWrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const Shop = ({ shop, onShopClick, onShopUpgradeClick }: ShopProps) => {
  return (
    <ShopWrapper>
      {shop.map((el) => (
        <ShopElement
          key={el.id}
          value={el}
          onShopClick={onShopClick}
          onShopUpgradeClick={onShopUpgradeClick}
        />
      ))}
    </ShopWrapper>
  );
};

export default Shop;
