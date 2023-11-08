import { ClickShopItem } from '../../types/appState';
import styled from 'styled-components';
import upgradeIco from '../../assets/images/disable_shovel.png';

const ClickShopImage = styled.div`
background-image: url(${upgradeIco});
height: 100px;
width: 100px;
border: 5px solid;
border-color: #584d3b;
cursor: pointer;
margin-left: 10px;
`;

type ClickShopElementProps = {
  value: ClickShopItem;
};

const ClickShopElement = ({ value }: ClickShopElementProps) => {
  return <ClickShopImage>{value.upgradeLevel}</ClickShopImage>;
};

export default ClickShopElement;
