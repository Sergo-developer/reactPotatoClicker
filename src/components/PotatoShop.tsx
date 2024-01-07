import styled from 'styled-components';
import planksImage from '../assets/images/spruce_planks.png';
import ClickShop from './potatoShop/ClickShop';
import Shop from './potatoShop/Shop';

const PotatoBlockWrapper = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  background-image: url(${planksImage});
`;

const PotatoShop = () => {
  return (
    <PotatoBlockWrapper>
      <ClickShop />
      <Shop />
    </PotatoBlockWrapper>
  );
};

export default PotatoShop;
