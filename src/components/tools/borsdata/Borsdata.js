import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../../common"
import {
  MAIN_THEME,
  ON_BACKGROUND,
  DP6,
  BACKGROUND_ACTIVE,
  BACKGROUND,
} from "../../../constants/theme"
import { Table } from "project-pillow-components"
import { API_CALLS } from "./constants"
import {
  getCountries,
  getMarkets,
  getSectors,
  getBranches,
  getInstruments,
  getStockPrices,
} from "../../api/borsData"

const FlexWrapper = styled.div`
  display: flex;
`

const Container = styled.div`
  padding: 1rem auto;
`

const TableWrapper = styled.div`
  color: #000000;
`

const Button = styled.button`
  padding: 1rem;
  margin: 0.5rem auto;
  border: none;
  background-color: ${p =>
    p.active ? MAIN_THEME.PRIMARY_DARK.color.background : BACKGROUND};
  color: ${ON_BACKGROUND};
  width: 100%;
  text-transform: uppercase;
  box-shadow: ${DP6};
  outline: none;
  cursor: pointer;
  :hover {
    background-color: ${p =>
      p.active ? MAIN_THEME.PRIMARY_DARK.color.background : BACKGROUND_ACTIVE};
  }
  :active {
    background-color: ${MAIN_THEME.PRIMARY_DARK.color.background};
  }
  :first-child {
    margin-right: 1rem;
  }
  :only-child {
    margin: 0.5rem auto;
  }
`

const ShowTable = ({
  title,
  headings,
  getData,
  countries,
  markets,
  sectors,
  branches,
}) => {
  const [show, setShow] = useState(true)
  const [rows, setRows] = useState([])
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const response = await getData()
            console.log(title, { response })
            setRows(response)
          }}
        >
          Get {title}
        </Button>
        {rows.length !== 0 && (
          <Button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"} {title}
          </Button>
        )}
      </FlexWrapper>
      {rows && rows.length !== 0 && show && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={headings}
            data={{
              rows: rows.map(row => ({
                cells: Object.entries(row).map(([key, value]) => {
                  if (!value && value !== 0) return "N/A"
                  if (key === "countryId") {
                    return countries[value - 1]
                      ? countries[value - 1].name
                      : value
                  }
                  if (key === "marketId") return markets[value - 1].name
                  if (key === "sectorId") return sectors[value - 1].name
                  if (key === "branchId") return branches[value - 1].name
                  return value === null ? "" : value.toString()
                }),
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const StockTable = ({
  title,
  countries,
  markets,
  sectors,
  branches,
  instruments,
}) => {
  const [show, setShow] = useState(true)
  const [stockPrices, setStockPrices] = useState([])
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const response = await getStockPrices()
            console.log(title, { response })
            setStockPrices(response)
          }}
        >
          Get {title}
        </Button>
        {stockPrices.length !== 0 && (
          <Button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"} {title}
          </Button>
        )}
      </FlexWrapper>
      {stockPrices && stockPrices.length !== 0 && show && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[
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
              { id: "0013", title: "ID", alignRight: false },
              { id: "0014", title: "Date", alignRight: false },
              { id: "0015", title: "Highest", alignRight: true },
              { id: "0016", title: "Lowest", alignRight: true },
              { id: "0017", title: "Opening", alignRight: true },
              { id: "0018", title: "Closing", alignRight: true },
              { id: "0019", title: "Total vol.", alignRight: true },
            ]}
            data={{
              rows: instruments.map(row => ({
                cells: Object.entries(row)
                  .map(([key, value]) => {
                    if (!value && value !== 0) return "N/A"
                    if (key === "countryId") {
                      return countries[value - 1]
                        ? countries[value - 1].name
                        : value
                    }
                    if (key === "marketId") return markets[value - 1].name
                    if (key === "sectorId") return sectors[value - 1].name
                    if (key === "branchId") return branches[value - 1].name
                    return value === null ? "" : value.toString()
                  })
                  .concat(
                    Object.values(
                      stockPrices.find(stockPrice => stockPrice.i === row.insId)
                    )
                  ),
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Borsdata = ({}) => {
  const [markets, setMarkets] = useState([])
  const [countries, setCountries] = useState([])
  const [sectors, setSectors] = useState([])
  const [branches, setBranches] = useState([])
  const [instruments, setInstruments] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const c = await getCountries()
      const m = await getMarkets()
      setCountries(c)
      setMarkets(m)
      setTimeout(async () => {
        const s = await getSectors()
        setSectors(s)
        const b = await getBranches()
        setBranches(b)
      }, 1000)
      setTimeout(async () => {
        const i = await getInstruments()
        setInstruments(i)
        setShow(true)
      }, 3000)
    }
    fetchData()
  }, [])

  return (
    <>
      <Wrapper>
        <h1>Börsdata</h1>
        {show && (
          <StockTable
            title="Stocks"
            countries={countries}
            markets={markets}
            sectors={sectors}
            branches={branches}
            instruments={instruments}
          />
        )}
      </Wrapper>
      <Wrapper>
        {API_CALLS.map(apiCall => (
          <ShowTable
            {...apiCall}
            countries={countries}
            markets={markets}
            sectors={sectors}
            branches={branches}
            instruments={instruments}
          />
        ))}
      </Wrapper>
    </>
  )
}

export default Borsdata
