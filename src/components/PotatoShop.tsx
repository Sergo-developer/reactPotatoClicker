import styled from 'styled-components';
import planksImage from '../assets/images/spruce_planks.png';
import clickUpgradeDeactivated from '../assets/images/disable_shovel.png';
import ClickShop from './potatoShop/ClickShop';
import { ClickShopItem, ShopItem } from '../types/appState';
import Shop from './potatoShop/Shop';

type PotatoShopProps = {
  clickShop: ClickShopItem[];
  shop: ShopItem[];
};

const PotatoBlockWrapper = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  background-image: url(${planksImage});
`;

const PotatoShop = ({ clickShop, shop }: PotatoShopProps) => {
  return (
    <PotatoBlockWrapper>
      <ClickShop clickShop={clickShop} />
      <Shop shop={shop} />
    </PotatoBlockWrapper>
  );
};

export default PotatoShop;
