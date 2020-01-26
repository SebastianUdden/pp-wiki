import React, { useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../../common"
import {
  MAIN_THEME,
  ON_BACKGROUND,
  DP6,
  BACKGROUND_ACTIVE,
  BACKGROUND,
} from "../../../constants/theme"
import {
  getCountries,
  getMarkets,
  getSectors,
  getBranches,
  getInstruments,
  getStockPrices,
} from "../../api/borsData"
import { Table } from "project-pillow-components"

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

const Markets = () => {
  const [markets, setMarkets] = useState([])
  const [showMarkets, setShowMarkets] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const marketsResponse = await getMarkets()
            setMarkets(marketsResponse)
          }}
        >
          Get Markets
        </Button>
        {markets.length !== 0 && (
          <Button onClick={() => setShowMarkets(!showMarkets)}>
            {showMarkets ? "Hide" : "Show"} markets
          </Button>
        )}
      </FlexWrapper>
      {markets && markets.length !== 0 && showMarkets && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[
              { id: "0001", title: "Market", alignRight: false },
              { id: "0002", title: "Exchange name", alignRight: false },
            ]}
            data={{
              rows: markets.map(m => ({
                cells: [m.name || "", m.exchangeName || ""],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Instruments = () => {
  const [instruments, setInstruments] = useState([])
  const [showInstruments, setShowInstruments] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const instrumentsResponse = await getInstruments()
            console.log({ instrumentsResponse })
            setInstruments(instrumentsResponse)
          }}
        >
          Get instruments
        </Button>
        {instruments.length !== 0 && (
          <Button onClick={() => setShowInstruments(!showInstruments)}>
            {showInstruments ? "Hide" : "Show"} instruments
          </Button>
        )}
      </FlexWrapper>
      {instruments && instruments.length !== 0 && showInstruments && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[
              { id: "0001", title: "Ticker", alignRight: false },
              { id: "0002", title: "Name", alignRight: false },
              { id: "0003", title: "ISIN", alignRight: false },
            ]}
            data={{
              rows: instruments.map(i => ({
                cells: [i.ticker || "", i.name || "", i.isin || ""],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Branches = () => {
  const [branches, setBranches] = useState([])
  const [showBranches, setShowBranches] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const branchesResponse = await getBranches()
            console.log({ branchesResponse })
            setBranches(branchesResponse)
          }}
        >
          Get branches
        </Button>
        {branches.length !== 0 && (
          <Button onClick={() => setShowBranches(!showBranches)}>
            {showBranches ? "Hide" : "Show"} branches
          </Button>
        )}
      </FlexWrapper>
      {branches && branches.length !== 0 && showBranches && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[
              { id: "0001", title: "Name", alignRight: false },
              { id: "0002", title: "Sector ID", alignRight: true },
            ]}
            data={{
              rows: branches.map(b => ({
                cells: [b.name || "", b.sectorId || ""],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Sectors = () => {
  const [sectors, setSectors] = useState([])
  const [showSectors, setShowSectors] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const sectorsResponse = await getSectors()
            console.log({ sectorsResponse })
            setSectors(sectorsResponse)
          }}
        >
          Get sectors
        </Button>
        {sectors.length !== 0 && (
          <Button onClick={() => setShowSectors(!showSectors)}>
            {showSectors ? "Hide" : "Show"} sectors
          </Button>
        )}
      </FlexWrapper>
      {sectors && sectors.length !== 0 && showSectors && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[{ id: "0001", title: "Name", alignRight: false }]}
            data={{
              rows: sectors.map(b => ({
                cells: [b.name || ""],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const countriesResponse = await getCountries()
            console.log({ countriesResponse })
            setCountries(countriesResponse)
          }}
        >
          Get countries
        </Button>
        {countries.length !== 0 && (
          <Button onClick={() => setShowCountries(!showCountries)}>
            {showCountries ? "Hide" : "Show"} countries
          </Button>
        )}
      </FlexWrapper>
      {countries && countries.length !== 0 && showCountries && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[{ id: "0001", title: "Name", alignRight: false }]}
            data={{
              rows: countries.map(b => ({
                cells: [b.name || ""],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const StockPrices = () => {
  const [stockPrices, setStockPrices] = useState([])
  const [showStockPrices, setShowStockPrices] = useState(true)
  return (
    <Container>
      <FlexWrapper>
        <Button
          onClick={async () => {
            const stockPricesResponse = await getStockPrices()
            console.log({ stockPricesResponse })
            setStockPrices(stockPricesResponse)
          }}
        >
          Get stockPrices
        </Button>
        {stockPrices.length !== 0 && (
          <Button onClick={() => setShowStockPrices(!showStockPrices)}>
            {showStockPrices ? "Hide" : "Show"} stockPrices
          </Button>
        )}
      </FlexWrapper>
      {stockPrices && stockPrices.length !== 0 && showStockPrices && (
        <TableWrapper>
          <Table
            enableSearch
            headingForegroundColor={BACKGROUND}
            alternateColor="#eeeeee"
            headings={[
              { id: "0001", title: "ID", alignRight: false },
              { id: "0002", title: "Date", alignRight: false },
              { id: "0003", title: "Highest", alignRight: true },
              { id: "0004", title: "Lowest", alignRight: true },
              { id: "0005", title: "Opening", alignRight: true },
              { id: "0006", title: "Closing", alignRight: true },
              { id: "0007", title: "Total vol.", alignRight: true },
            ]}
            data={{
              rows: stockPrices.map(s => ({
                cells: [
                  s.i || "",
                  s.d || "",
                  s.h || "",
                  s.l || "",
                  s.c || "",
                  s.o || "",
                  s.v || "",
                ],
              })),
            }}
          />
        </TableWrapper>
      )}
    </Container>
  )
}

const Borsdata = ({}) => {
  return (
    <Wrapper>
      <h1>Börsdata</h1>
      <Countries />
      <Markets />
      <Sectors />
      <Branches />
      <Instruments />
      <StockPrices />
    </Wrapper>
  )
}

export default Borsdata
