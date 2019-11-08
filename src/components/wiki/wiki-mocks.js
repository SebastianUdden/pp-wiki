const pe = {
  title: "P/E",
  description: "Beskrivning av P/E",
  tags: ["finansiell analys", "nyckeltal"],
}
const ps = {
  title: "P/S",
  description: "Beskrivning av P/S",
  tags: ["finansiell analys", "nyckeltal"],
}

const finansiellaTermer = {
  title: "Finansiella termer",
  description: "Olika finansiella termer",
  tags: ["finansiell analys", "nyckeltal"],
  children: [ps, pe],
}

const finansiellAnalys = {
  title: "Finansiell analys",
  description: "Besrkivning av finansiell analys",
  children: [finansiellaTermer],
}

export const MOCK_WIKI = finansiellAnalys
