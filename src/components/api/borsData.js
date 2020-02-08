import { get } from "./api"
import { borsDataApiKey } from "../../constants/urls"

const getBorsData = async (type, prop) => {
  console.log({ borsDataApiKey })
  if (!apiKey) return []
  const response = await get(
    `https://apiservice.borsdata.se/v1/${type}?authKey=${borsDataApiKey}`
  )
  console.log(`${type}: `, response)
  return prop ? response[prop] : response[type]
}

export const getCountries = () => getBorsData("countries")
export const getMarkets = () => getBorsData("markets")
export const getSectors = () => getBorsData("sectors")
export const getBranches = () => getBorsData("branches")
export const getInstruments = () => getBorsData("instruments")
export const getStockPrices = () =>
  getBorsData("instruments/stockprices/last", "stockPricesList")

export const getStockQuotes = ({
  Ticker,
  onResponse = response => console.log(response),
}) => {
  const apiKey = process.env.BORSDATA_API_KEY
  get(`https://apiservice.borsdata.se/${Ticker}?authKey=${apiKey}`).then(
    response => {
      console.log("Borsdata-response: ", response)
      onResponse(response)
      // response.note
      //   ? onResponse(response)
      //   : onResponse(response["Time Series (Daily)"])
    }
  )
}
