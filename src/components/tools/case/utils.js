export const setInputValue = (b, allInfo, e) => {
  if (!b) return
  const entries = Object.entries(allInfo)
  entries.forEach(([key, value]) => {
    if (b.category === key) {
      value.set({
        ...value.get,
        [b.label]: { value: e.target.value, ...b },
      })
      return
    }
  })
}

export const getInputValue = (b, allInfo, format) => {
  if (!b) return
  const entries = Object.entries(allInfo)
  const results = entries
    .map(([key, value]) => {
      if (b.category === key && value.get) {
        return value.get[b.label]
      }
    })
    .filter(Boolean)
  return results ? results[0] : null
}

export const checkForContent = allInfo => {
  const checkArrays = Object.values(allInfo).map(
    value => value.get && Object.values(value.get).findIndex(d => d) !== -1
  )
  return !checkArrays.some(Boolean)
}

export const downloadData = ({
  data,
  fileName = `backup-${new Date().toLocaleString()}`,
  extension = "json",
}) => {
  if (!data) {
    alert("ERROR! No data added for download...")
    return
  }
  const downloadElement = document.createElement("a")
  const dataString = `data:text/${extension};charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`
  downloadElement.setAttribute("href", dataString)
  downloadElement.setAttribute("download", `${fileName}.${extension}`)
  document.body.appendChild(downloadElement)
  downloadElement.click()
  downloadElement.remove()
}

export const formatForWiki = data => {
  const title = data["Base information"].get["Company Name"].value
  const body = Object.entries(data)
    .map(([h2, h3s]) => {
      const formattedH3s =
        h3s.get &&
        Object.values(h3s.get).map(value => {
          const formattedValues = [
            `**${value.label}**`,
            formatNumberOrString(value.value),
          ]
          return formattedValues
        })

      const formattedH2s = ["\n", `### ${h2}`, "---", formattedH3s]
      return formattedH2s
    })
    .flat(3)
    .filter(Boolean)
    .join("\n")
  return {
    title,
    description: {
      meta: { justifyContent: "flex-start" },
      body,
    },
  }
}

export const formatNumberOrString = value => {
  if (isNaN(value)) {
    return value
  }
  return getNumberWithSpaces(value)
}

export const getNumberWithSpaces = number => {
  const noDecimals = number.substring(number.length - 3, number.length) == ".00"
  return noDecimals
    ? number
        .substring(0, number.length - 3)
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : number.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const round = number => Math.round(number)
export const roundTwoDec = number => number.toFixed(2)

export const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}
