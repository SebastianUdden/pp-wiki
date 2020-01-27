export const formatWithSpaces = value =>
  value &&
  value
    .toString()
    .replace(/ /g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export const calculateInterest = (value, interestRate) => {
  const interestRatio = 1 + interestRate / 100
  return value * interestRatio
}

export const getYearlyResults = ({
  yearsOfSaving = 0,
  deposit = 0,
  monthlyDeposit = 0,
  interestRate = 0,
}) => {
  const yearlyResults = [parseInt(deposit)]
  for (let year = 1; year < yearsOfSaving; year++) {
    yearlyResults.push(
      calculateInterest(yearlyResults[year - 1], interestRate) +
        parseInt(monthlyDeposit) * 12
    )
  }
  return yearlyResults
}
