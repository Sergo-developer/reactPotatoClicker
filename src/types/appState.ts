export type ShopItem = {
  id: number;
  name: string;
  image: string;
  image2: string;
  image3: string;
  amount: number;
  startPotatoPerSec: number;
  startPrice: number;
  priceIncreaseByAmount: number;
  upgradeLevel: number;
};

export type ClickShopItem = {
  id: number;
  name: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  upgradeLevel: number;
};

export type AppState = {
  totalPotatoes: number;
  shop: ShopItem[];
  clickShop: ClickShopItem[];
  potatoClickSound: string[];
};

export type ComputedState = {
  potatoesPerSec: number;
  potatoesPerClick: number;
};
