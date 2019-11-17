const pe = {
  id: "1234567890",
  title: "P/E",
  secondaryText: "Price-to-earnings",
  description: `P/E är en förkortning för **price/earnings** och är ett av de vanligaste nyckeltalen som används för att se om en aktie är *köpvärd* eller inte. Price står för aktiens pris och earnings står för bolagets vinst. 
  Nyckeltalet visar alltså priset på en aktie i relation till bolagets vinst per aktie. Vinsten per aktie är bolagets totala vinst delat med antal aktier som finns i bolaget. 
  ###### Jämförelse
  När man jämför P/E-tal med varandra är det viktigt att jämföra äpplen med äpplen och päron med päron. För börsbolagen innebär det att det är relevant att jämföra SEB och Swedbank men inte SEB och H&M. \n\n (PLACEHOLDER FÖR JPG MED LINJEDIAGRAM SOM VISAR HISTORISKA PE FÖR VARJE BRANSCH). \n\n Normalt brukar P/E-talet i snitt röra sig mellan 12-18 på Stockholmsbörsen, men det är stora skillnader mellan bolag beroende av deras tillväxtpotential. Bolag som växer mindre än fem procent per år handlas normalt till 5-12, de som växer 5-10 procent handlas ofta till 7-20 och de som har en tillväxt över 10 procent pendlar oftast mellan 15-25. \n\n För att P/E talet ska säga något meningsfullt bör man därför som investerare göra två jämförelser: \n\n 1.Jämför vilket P/E aktien historiskt har handlats till (detta ger en bra vink om aktiekursen idag är 'dyr eller billig för tillfället'). \n 2.Jämför vilket P/E konkurrenter och branschen i genomsnitt handlas till (detta ger en bra vink om aktiekursen är 'dyr eller billig'). \n VIKTIGT: Ett lågt P/E betyder inte per automatik att det är en bra investeringsmöjlighet. Det finns nästan alltid en förklaring till den låga värderingen och det är först om bolaget visar att man kan växa mer/snabbare som värderingen också kommer att justeras.`,
  tags: ["pe", "värdering", "finansiell analys", "nyckeltal"],
  link: {
    title: "Avanza Akademin > Vad är P/E-tal?",
    href:
      "https://www.avanza.se/lar-dig-mer/avanza-akademin/aktier/vad-ar-pe-tal.html",
  },
}
const ps = {
  id: "1234567891",
  title: "P/S",
  secondaryText: "Price-to-sales",
  description: "Ipsum lorum hipster cake on dwarfs",
  tags: ["ps", "värdering", "finansiell analys", "nyckeltal"],
  link: {
    title: "Google",
    href: "https://www.google.com",
  },
}

const värdering = {
  id: "1234567899",
  title: "Värdering",
  description: "Definitioner av värdering",
  tags: ["värdering", "nyckeltal"],
  showChildren: true,
  children: [ps, pe],
  table: {
    headings: [
      { title: "Nyckeltal", alignRight: false },
      { title: "Algoritm", alignRight: false },
      { title: "Rekommendation", alignRight: false },
    ],
    data: {
      rows: [
        { cells: ["P/E", "Price per share / Earnings per share", "P/E < 18"] },
        { cells: ["P/S", "Price per share / Sales per share", "P/S < 18"] },
        { cells: ["P/B", "Price per share / Book per share", "P/B < 18"] },
      ],
    },
  },
}

const likviditet = {
  id: "1234567891238",
  title: "Likviditet",
  description: "Definitioner av likviditet",
  tags: ["likviditet", "nyckeltal"],
  showChildren: true,
  children: [],
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

const jsBasics = {
  id: "8234567895",
  title: "Grunder",
  secondaryText: "",
  description:
    "Grundläggande delar för att skriva med JavaScript är användandet av variabler (ex. const, let, var), valbarhet (ex. if, else), loopar (ex. for() forEach, map) och listor (ex. array, [])",
  children: [],
}

const javaScript = {
  id: "2234567895",
  title: "JavaScript",
  secondaryText: "Hanterar logik för webbsidor",
  description:
    "JavaScript räknar ut och hämtar de delar som behövs för struktur (HTML) och sätter in den design (CSS) som behövs på rätt ställen.",
  children: [jsBasics],
}

const headings = {
  id: "7244567895",
  title: "Headings",
  secondaryText: "",
  description:
    "HTML-element som styr rubriker, från största till minsta är de <h1>, <h2>, <h3>, <h4>, <h5> och <h6>. För att skriva en rubrik skriver man alltså <h1>Stor rubrik</h1>.",
  children: [],
}

const htmlElements = {
  id: "7234567895",
  title: "HTML Elements",
  secondaryText: "",
  description:
    "HTML-element [test](https://www.google.com) skrivs ut i två olika format, antingen <ElementTyp>Innehåll</ElementTyp> eller <ElementTyp />. Den första används när ett element ska ha ett innehåll (children), det andra används för element som antingen bara har en styling (med CSS) eller när de är dynamiska element (ex. <input /> för att användarens ska skriva in ny text). Det finns exempelvis rubriker av olika storlek (<h1>, <h2> ... <h6>), paragrafer (<p>), radbrytningar (<br>) och listor (<ul>, <ol>, <li>).",
  children: [headings],
}

const html = {
  id: "3234567895",
  title: "HTML",
  secondaryText: "Hanterar struktur för webbsidor",
  description:
    "HTML bygger upp stommen för en webbsida, det är i grunden gjort för text-struktur och har många likheter med hur exempelvis ett Word-dokument är uppbyggt. Alla html-element är i grunden rektanglar, som en liknelse kan vi föreställa oss ett antal tavlor i olika storlekar som sätts tätt ovanpå varandra för att pryda en vägg. Tavlorna kan ha olika bredd baserat på ex. textinnehåll men de placeras alltid ovanpå varandra om inte annat är definierat.",
  children: [htmlElements],
}

const cssBoxModel = {
  id: "5234567895",
  title: "Box Model",
  secondaryText: "",
  description:
    "CSS Box Model är kombinationen av attribut som avgör bredden och höjden av ett HTML-element. Om vi då ser ett HTML-element som en tavla kan vi analysera de grundläggande css-attributen utifrån och in. Det första/yttersta attributet heter margin och avgör hur långt avstånd tavlan ska vara från de andra tavlorna (ex. margin: 10px för att ha 10 pixlar utrymme från tavlor i alla riktningar). Det andra attributet i ordningen är border och är utrymmet mellan padding och margin, det kan ses som ramen för tavlan (ex. 'border: 1px solid black' för en pixels bred svart ram). Det tredje attributet heter padding och är utrymmet mellan innehållet och border, det kan ses som tavlans passepartout (ex. padding: 5px för en 5 pixlar bred passepartout runt tavlan). Det fjärde och sista attributet är content, vilket kan ses som innehållet i tavlan, det kommer ta upp så mycket plats som behövs om inte bredd (width) eller höjd (height) specifierats.",
  children: [],
}

const cssColors = {
  id: "6234567895",
  title: "Colors",
  secondaryText: "",
  description:
    "CSS Colors är färgsättningen av HTML-element. De olika delar som kan färgläggas är texten (ex. color: white), boxen (ex. background-color: #000000) eller linjen (ex. border: 1px dashed black). Färgläggning i CSS skrivs i klartext (ex. red) hexadecimal (ex. #ffffff) eller rgb (ex. rgb(255, 255, 255).",
  children: [],
}

const css = {
  id: "4234567895",
  title: "CSS",
  secondaryText: "Hanterar design för webbsidor",
  description:
    "CSS målar upp utseendet för en webbsida, det tar hand om saker som färger (color, background-color), yttre avstånd (margin), inre avstånd (padding) och linjer (border).",
  children: [cssBoxModel, cssColors],
}

const utveckling = {
  id: "1234567895",
  title: "Utveckling",
  secondaryText: "Förklaring av utvecklingsterminologi",
  description:
    "Den moderna webben är i sitt fundament uppbyggt kring tre språk som arbetar tillsammans. De språken är JavaScript, HTML och CSS. För att enklare förklara koncepten kan vi ha analogier till de olika språken. JavaScript bygger logiken för sidan och kan liknas vid en robot som ska sätta upp tavlor på en vägg. HTML är strukturen för sidan och kan liknas vid de spikar och ramar som roboten använder för tavlorna. CSS sköter design och kan därför liknas vid målarfärg och penslar som roboten använder för färglägga tavlorna.",
  children: [javaScript, html, css],
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
  javaScript,
  utveckling,
  strategier,
]
export const MOCK_WIKI = {
  id: "1234567897",
  title: "Wiki",
  description: "Pillow wiki",
  children: [finansiellAnalys, utveckling, strategier],
}
