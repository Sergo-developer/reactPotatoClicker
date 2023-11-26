import styled from 'styled-components';
import { ShopItem } from '../../types/appState';
import ShopElement from './ShopElement';

type ShopProps = {
  shop: ShopItem[];
};

const ShopWrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const Shop = ({ shop }: ShopProps) => {
  return (
    <ShopWrapper>
      {shop.map((el) => (
        <ShopElement key={el.id} value={el} />
      ))}
    </ShopWrapper>
  );
};

export default Shop;
