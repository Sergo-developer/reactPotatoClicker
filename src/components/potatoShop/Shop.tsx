import styled from 'styled-components';
import { ShopItem } from '../../types/appState';
import ShopElement from './ShopElement';

type ShopProps = {
  shop: ShopItem[];
};

const ShopWrapper = styled.div``;

const Shop = ({ shop }: ShopProps) => {
  return (
    <ShopWrapper>
      {shop.map((el) => (
        <ShopElement value={el} />
      ))}
    </ShopWrapper>
  );
};

export default Shop;
