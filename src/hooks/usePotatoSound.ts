import useSound from 'use-sound';
import upgradeSound from '../assets/sounds/upgrade_sound_1.ogg';
import finalUpgradeSound from '../assets/sounds/upgrade_sound_2.ogg';
import popSound from '../assets/sounds/pop.ogg';

import potatoSound1 from '../assets/sounds/potato_1.ogg';
import potatoSound2 from '../assets/sounds/potato_2.ogg';
import potatoSound3 from '../assets/sounds/potato_3.ogg';

type UsePotatoSound = {
  playPotatoSound: () => void;
  playShopBuySound: () => void;
  playUpgradeSound: () => void;
  playFinalUpgradeSound: () => void;
};

const usePotatoSound = (): UsePotatoSound => {
  const [potato1] = useSound(potatoSound1);
  const [potato2] = useSound(potatoSound2);
  const [potato3] = useSound(potatoSound3);
  const [playShopBuySound] = useSound(popSound);
  const [playUpgradeSound] = useSound(upgradeSound);
  const [playFinalUpgradeSound] = useSound(finalUpgradeSound);

  const playPotatoSound = () => {
    const soundIndex = Math.floor(Math.random() * 3);

    return [potato1, potato2, potato3][soundIndex]();
  };

  return {
    playPotatoSound,
    playShopBuySound,
    playUpgradeSound,
    playFinalUpgradeSound,
  };
};

export default usePotatoSound;
