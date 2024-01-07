export type ShopItem = {
  id: number;
  name: string;
  images: string[];
  amount: number;
  startPotatoPerSec: number;
  startPrice: number;
  priceIncreaseByAmount: number;
  upgradeLevel: number;
};

export type ClickShopItem = {
  id: number;
  name: string;
  images: string[];
  upgradeLevel: number;
};

export type AppState = {
  totalPotatoes: number;
  shop: ShopItem[];
  clickShop: ClickShopItem[];
};

export type ComputedState = {
  potatoesPerSec: number;
  potatoesPerClick: number;
};
