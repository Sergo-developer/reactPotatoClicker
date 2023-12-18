import styled from 'styled-components';
import planksImage from '../assets/images/spruce_planks.png';
// import clickUpgradeDeactivated from '../assets/images/disable_shovel.png';
import ClickShop from './potatoShop/ClickShop';
import { ClickShopItem, ShopItem } from '../types/appState';
import Shop from './potatoShop/Shop';

type PotatoShopProps = {
  totalPotatoes: number;
  clickShop: ClickShopItem[];
  shop: ShopItem[];
  onShopClick: (id: number) => void;
  onShopUpgradeClick: (id: number) => void;
  onClickShopUpgradeClick: (id: number) => void;
};

const PotatoBlockWrapper = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  background-image: url(${planksImage});
`;

const PotatoShop = ({
  totalPotatoes,
  clickShop,
  shop,
  onClickShopUpgradeClick,
  onShopClick,
  onShopUpgradeClick,
}: PotatoShopProps) => {
  return (
    <PotatoBlockWrapper>
      <ClickShop totalPotatoes={totalPotatoes} clickShop={clickShop} onClickShopUpgradeClick={onClickShopUpgradeClick} />
      <Shop totalPotatoes={totalPotatoes} shop={shop} onShopClick={onShopClick} onShopUpgradeClick={onShopUpgradeClick} />
    </PotatoBlockWrapper>
  );
};

export default PotatoShop;
