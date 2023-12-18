import styled from 'styled-components';
import { ClickShopItem } from '../../types/appState';
import ClickShopElement from './ClickShopElement';

type ClickShopProps = {
  totalPotatoes: number;
  clickShop: ClickShopItem[];
  onClickShopUpgradeClick: (id: number) => void;
};

const ClickShopWrapper = styled.div`
  display: inline-flex;
`;

const ClickShop = ({totalPotatoes, clickShop, onClickShopUpgradeClick }: ClickShopProps) => {
  return (
    <ClickShopWrapper>
      {clickShop.map((el) => (
        <ClickShopElement totalPotatoes={totalPotatoes} key={el.id} value={el} onClickShopUpgradeClick={onClickShopUpgradeClick} />
      ))}
    </ClickShopWrapper>
  );
};

export default ClickShop;
