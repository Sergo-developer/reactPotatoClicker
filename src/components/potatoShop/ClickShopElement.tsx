import { ClickShopItem } from '../../types/appState';
import styled from 'styled-components';
import upgradeIco from '../../assets/images/disable_shovel.png';

type ClickShopElementProps = {
  value: ClickShopItem;
};

const ClickShopElement = ({ value }: ClickShopElementProps) => {
  const ClickShopImage = styled.div`
    background-image: url(${value.image});
    height: 100px;
    width: 100px;
    border: 5px solid;
    border-color: #584d3b;
    cursor: pointer;
    margin-left: 10px;
    color: #99ff00;
    text-shadow: black 0 0 10px;
  `;

  return <ClickShopImage>{value.upgradeLevel}</ClickShopImage>;
};

export default ClickShopElement;
