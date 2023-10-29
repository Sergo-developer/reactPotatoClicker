export type ShopItem = {
  name: string;
  image: string;
  amount: number;
  startPotatoPerSec: number;
  startPrice: number;
  priceIncreaseByAmount: number;
  upgradeLevel: number;
};

export type ClickShopItem = {
  name: string;
  image: string;
  upgradeLevel: number;
};

export type AppState = {
  totalPotatoes: number;
  shop: ShopItem[];
  clickShop: ClickShopItem[];
};
