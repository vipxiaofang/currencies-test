import axios from "axios";

const API_URL = "https://data.messari.io";

const instance = axios.create({
  baseURL: `${API_URL}/`,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-messari-api-key": "0f365ae9-dfc8-44f7-9d24-cabaa7968a65",
  },
});

export const getMetrics = async (currency) => {
  try {
    const { data } = await instance.get(`/api/v1/assets/${currency.toLowerCase()}/metrics`);
    const { symbol, name, market_data } = data.data;
    return {
      symbol,
      name,
      price: market_data.price_usd?.toFixed(2),
      percent: market_data.percent_change_usd_last_24_hours?.toFixed(2),
      market_data,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
