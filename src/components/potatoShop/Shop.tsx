import styled from 'styled-components';
import ShopElement from './ShopElement';
import useAppState from '../../hooks/useAppState';

const ShopWrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const Shop = () => {
  const [appState] = useAppState();
  
  return (
    <ShopWrapper>
      {appState.shop.map((el) => (
        <ShopElement key={el.id} value={el} />
      ))}
    </ShopWrapper>
  );
};

export default Shop;
