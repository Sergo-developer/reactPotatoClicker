import styled from 'styled-components';
import ShopElement from './ShopElement';
import useKek from '../../hooks/useKek';

const ShopWrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const Shop = () => {
  const {appState} = useKek();

  
  return (
    <ShopWrapper>
      {appState.shop.map((el) => (
        <ShopElement key={el.id} value={el} />
      ))}
    </ShopWrapper>
  );
};

export default Shop;
