import styled from 'styled-components';
import potatoImage from '../assets/images/potato.png';
import dirtImage from '../assets/images/dirt.png';
import spruceLog from '../assets/images/spruce_log.png';
import usePotatoSound from '../hooks/usePotatoSound';
import useKek from '../hooks/useKek';

const MainBlockWrapper = styled.div`
  display: grid;
  grid-template-rows: 70px auto 1fr 70px;
  height: 450px;
  background-image: url(${dirtImage});
`;

const TotalPotatoes = styled.div`
  user-select: none;
  font-size: 40px;
  color: white;
  text-shadow: black 0 0 10px;
`;

const PotatoesPerSec = styled(TotalPotatoes)`
  font-size: 30px;
`;

const Potato = styled.div`
  margin: 0 auto;
  background-image: url(${potatoImage});
  width: 228px;
  height: 190px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition-duration: 0.5s;
  cursor: pointer;
  user-select: none;

  &:hover {
    width: 248px;
    height: 210px;
    transition-duration: 0.5s;
  }

  &:active {
    width: 228px;
    height: 190px;
    transition-duration: 0.1s;
    transform: rotate(9deg);
  }
`;

const PotatoesPerClick = styled(PotatoesPerSec)`
  background-image: url(${spruceLog});
  text-align: center;
  user-select: none;
`;

const MainBlock = () => {
  const {appState, setAppState, computedState, } = useKek();

  const { playPotatoSound } = usePotatoSound();

  const onPotatoClick = () => {
    setAppState({
      ...appState,
      totalPotatoes: computedState.potatoesPerClick + appState.totalPotatoes,
    });

    playPotatoSound();
  };

  return (
    <MainBlockWrapper>
      <TotalPotatoes>Картошка {appState.totalPotatoes}</TotalPotatoes>
      <PotatoesPerSec>Картошка/сек {computedState.potatoesPerSec}</PotatoesPerSec>
      <Potato onClick={onPotatoClick} />
      <PotatoesPerClick>{computedState.potatoesPerClick}/клик</PotatoesPerClick>
    </MainBlockWrapper>
  );
};

export default MainBlock;
