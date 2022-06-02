import { createContext } from "react";
import { runInAction, makeAutoObservable } from "mobx";
import { getMetrics } from "../http";
import { series } from "async";

const defaultInitialCoins = ["BTC", "ETH", "DOGE"];

const seriesCallback = (currency) => {
  return (callback) => {
    getMetrics(currency)
      .then((res) => callback(null, res))
      .catch(callback);
  };
};

class Index {
  coins = [];
  currencies = [];
  loading = true;

  constructor(coins) {
    makeAutoObservable(this);
    this.initCoin(coins);
  }

  getCurrencies = () => {
    series(this.coins.map(seriesCallback), (err, result) => {
      if (err) return;

      runInAction(() => {
        if (this.loading) this.loading = false;
        this.currencies = result;
      })
    });
  }

  initCoin = (coins) => {
    this.coins = coins;
    this.getCurrencies();
  }

  addCurrency = (coin, currency) => {
    this.coins.push(coin);
    this.currencies.push(currency);
  }

  removeCoin = (coin) => {
    this.coins = this.coins.filter((val) => val !== coin);
    this.getCurrencies();
  }
}

export const store = new Index(defaultInitialCoins);

const storeContext = createContext(store);

export default storeContext;
