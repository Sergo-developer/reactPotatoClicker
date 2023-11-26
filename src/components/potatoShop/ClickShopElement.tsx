import { ClickShopItem } from '../../types/appState';
import styled from 'styled-components';
// import upgradeIco from '../../assets/images/disable_shovel.png';

type ClickShopElementProps = {
  value: ClickShopItem;
};

const ClickShopImage = styled.div<{ value: ClickShopItem }>`
  background-image: url(${({ value }) => value.image});
  height: 100px;
  width: 100px;
  border: 5px solid;
  border-color: #584d3b;
  cursor: pointer;
  margin-left: 10px;
  color: #99ff00;
  text-shadow: black 0 0 10px;
`;

const ClickShopElement = ({ value }: ClickShopElementProps) => {
  return <ClickShopImage value={value}>{value.upgradeLevel}</ClickShopImage>;
};

export default ClickShopElement;
