import { get } from "./api"

export const getStockQuotes = ({
  Ticker,
  onResponse = response => console.log(response),
}) => {
  const apiKey = process.env.STOCK_API_KEY
  const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${Ticker}&apikey=${apiKey}`
  console.log({ stockUrl })
  get(stockUrl).then(response => {
    console.log("Symbol-response: ", response)
    response.note
      ? onResponse(response)
      : onResponse(response["Time Series (Daily)"])
  })
}
