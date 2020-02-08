import {
  getCountries,
  getMarkets,
  getSectors,
  getBranches,
  getInstruments,
  getStockPrices,
} from "../../api/borsData"

export const API_CALLS = [
  {
    title: "Countries",
    getData: getCountries,
    headings: [
      { id: "0001", title: "ID", alignRight: false },
      { id: "0002", title: "Name", alignRight: false },
    ],
  },
  {
    title: "Markets",
    getData: getMarkets,
    headings: [
      { id: "0001", title: "ID", alignRight: false },
      { id: "0002", title: "Market", alignRight: false },
      { id: "0003", title: "Country", alignRight: false },
      { id: "0004", title: "Is index", alignRight: false },
      { id: "0005", title: "Exchange name", alignRight: false },
    ],
  },
  {
    title: "Sectors",
    getData: getSectors,
    headings: [
      { id: "0001", title: "ID", alignRight: false },
      { id: "0002", title: "Name", alignRight: false },
    ],
  },
  {
    title: "Branches",
    getData: getBranches,
    headings: [
      { id: "0001", title: "ID", alignRight: false },
      { id: "0002", title: "Name", alignRight: false },
      { id: "0003", title: "Sector", alignRight: true },
    ],
  },
  {
    title: "Instruments",
    getData: getInstruments,
    headings: [
      { id: "0001", title: "Ins. ID", alignRight: false },
      { id: "0002", title: "Name", alignRight: false },
      { id: "0003", title: "URL", alignRight: false },
      { id: "0004", title: "Instrument", alignRight: false },
      { id: "0005", title: "ISIN", alignRight: false },
      { id: "0006", title: "Ticker", alignRight: false },
      { id: "0007", title: "Yahoo", alignRight: false },
      { id: "0008", title: "Sector", alignRight: false },
      { id: "0009", title: "Market", alignRight: false },
      { id: "0010", title: "Branch", alignRight: false },
      { id: "0011", title: "Country", alignRight: false },
      { id: "0012", title: "Listing Date", alignRight: false },
    ],
  },
  {
    title: "Stock prices",
    getData: getStockPrices,
    headings: [
      { id: "0001", title: "ID", alignRight: false },
      { id: "0002", title: "Date", alignRight: false },
      { id: "0003", title: "Highest", alignRight: true },
      { id: "0004", title: "Lowest", alignRight: true },
      { id: "0005", title: "Opening", alignRight: true },
      { id: "0006", title: "Closing", alignRight: true },
      { id: "0007", title: "Total vol.", alignRight: true },
    ],
  },
]
