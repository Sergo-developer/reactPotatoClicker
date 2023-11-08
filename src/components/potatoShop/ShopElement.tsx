import { ShopItem } from '../../types/appState';
import styled from 'styled-components';

type ShopElementProps = {
  value: ShopItem;
};

const ShopElement = ({ value }: ShopElementProps) => {
  return <div>{value.name}</div>;
};

export default ShopElement;
