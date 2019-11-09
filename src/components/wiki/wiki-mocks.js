const pe = {
  id: "1234567890",
  title: "P/E",
  secondaryText: "Price-to-earnings",
  description: "Beskrivning av P/E",
  tags: ["värdering", "finansiell analys", "nyckeltal"],
  link: {
    title: "Google",
    ref: "https://www.google.com",
  },
}
const ps = {
  id: "1234567891",
  title: "P/S",
  secondaryText: "Price-to-sales",
  description: "Ipsum lorum hipster cake on dwarfs",
  tags: ["värdering", "finansiell analys", "nyckeltal"],
  link: {
    title: "Google",
    ref: "https://www.google.com",
  },
}

const värdering = {
  id: "1234567899",
  title: "Värdering",
  description: "Definitioner av värdering",
  tags: ["värdering", "nyckeltal"],
  showChildren: true,
  children: [ps, pe],
}

const likviditet = {
  id: "1234567891238",
  title: "Likviditet",
  description: "Definitioner av likviditet",
  tags: ["likviditet", "nyckeltal"],
  showChildren: true,
  children: [ps, pe],
}

const finansiellaDefinitioner = {
  id: "1234567892",
  title: "Definitioner",
  description: "Definitioner av finansiella termer",
  tags: ["finansiell analys", "nyckeltal"],
}

const finansiellAnalys = {
  id: "1234567893",
  title: "Finansiell analys",
  description: "Beskrivning av finansiell analys",
  children: [finansiellaDefinitioner, värdering, likviditet],
}

/////////////////////////////////////////////////////////

const utvecklingsDefinitioner = {
  id: "1234567894",
  title: "Definitioner",
  description: "Definitioner av utvecklingstermer",
  tags: ["utveckling", "programmering"],
  children: [],
}

const utveckling = {
  id: "1234567895",
  title: "Utveckling",
  description: "Beskrivning av finansiell analys",
  children: [utvecklingsDefinitioner],
}

/////////////////////////////////////////////////////////

const strategier = {
  id: "1234567896",
  title: "Strategier",
  description: "Beskrivning av strategier",
}

export const FLAT_DATA = [
  ps,
  pe,
  värdering,
  finansiellaDefinitioner,
  finansiellAnalys,
  utvecklingsDefinitioner,
  utveckling,
  strategier,
]
export const MOCK_WIKI = {
  id: "1234567897",
  title: "Wiki",
  description: "Pillow wiki",
  children: [finansiellAnalys, utveckling, strategier],
}
