import { createContext } from "react";
import { runInAction, makeAutoObservable } from "mobx";
import { getMetrics } from "../http";
import { series } from "async";

const defaultInitialCoins = ["BTC", "ETH", "DOGE"];

const seriesCallback = (currency) => {
  return (callback) => {
    setTimeout(() => {
      getMetrics(currency)
        .then((res) => callback(null, res))
        .catch(callback);
    }, 800)
  };
};

class Index {
  coins = [];
  currencies = [];
  loading = true;
  message = '';

  constructor(coins) {
    makeAutoObservable(this);
    this.initCoin(coins);
  }

  getCurrencies = () => {
    series(this.coins.map(seriesCallback), (err, result) => {
      runInAction(() => {
        this.loading = false;
        this.message = err ? (err.response.data?.status?.error_message || err.message) : '';
        if (!err) this.currencies = result;
      })
    });
  }

  initCoin = (coins) => {
    this.coins = coins;
    this.getCurrencies();
  }

  addCurrency = (coin, currency) => {
    this.coins = [...this.coins, coin];
    this.currencies = [...this.currencies, currency];
  }

  removeCoin = (coin) => {
    this.coins = this.coins.filter(val => val !== coin);
    this.currencies = this.currencies.filter(currency => currency.symbol !== coin);
  }
}

export const store = new Index(defaultInitialCoins);

const storeContext = createContext(store);

export default storeContext;
