export type ShopItem = {
  id: number;
  name: string;
  image: string;
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
  upgradeLevel: number;
};

export type AppState = {
  totalPotatoes: number;
  potatoesPerSec: number;
  potatoesPerClick: number;
  shop: ShopItem[];
  clickShop: ClickShopItem[];
  potatoClickSound: string[];
};
