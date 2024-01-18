import styled from 'styled-components';
import ClickShopElement from './ClickShopElement';
import useKek from '../../hooks/useKek';

const ClickShopWrapper = styled.div`
  display: inline-flex;
`;

const ClickShop = () => {
  const {appState} = useKek();


  return (
    <ClickShopWrapper>
      {appState.clickShop.map((el) => (
        <ClickShopElement key={el.id} value={el} />
      ))}
    </ClickShopWrapper>
  );
};

export default ClickShop;
