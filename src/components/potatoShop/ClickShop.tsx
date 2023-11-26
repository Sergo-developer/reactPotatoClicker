import styled from 'styled-components';
import { ClickShopItem } from '../../types/appState';
import ClickShopElement from './ClickShopElement';

type ClickShopProps = {
  clickShop: ClickShopItem[];
};

const ClickShopWrapper = styled.div`
    display: inline-flex;
`;

const ClickShop = ({ clickShop }: ClickShopProps) => {
  return (
    <ClickShopWrapper>
      {clickShop.map((el) => (
        <ClickShopElement key={el.id} value={el} />
      ))}
    </ClickShopWrapper>
  );
};

export default ClickShop;
