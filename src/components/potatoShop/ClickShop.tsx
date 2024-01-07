import styled from 'styled-components';
import ClickShopElement from './ClickShopElement';
import useAppState from '../../hooks/useAppState';

const ClickShopWrapper = styled.div`
  display: inline-flex;
`;

const ClickShop = () => {
  const [appState] = useAppState();

  return (
    <ClickShopWrapper>
      {appState.clickShop.map((el) => (
        <ClickShopElement key={el.id} value={el} />
      ))}
    </ClickShopWrapper>
  );
};

export default ClickShop;
