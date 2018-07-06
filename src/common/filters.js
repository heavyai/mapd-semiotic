import dataLayer from "../services/dataLayer"
import * as queries from "../common/queries"

// updates the count widget's query
export const filterCount = (chartsState) => {
  const { bar, line } = chartsState
  const { brush } = line
  const { selected } = bar
  const { key0: city, key1: carrier } = selected

  const filterStrings = dataLayer({
    dateRange: brush,
    destCity: city,
    carrierName: carrier
  })

  let newQueryCount = `${queries.count}`
  let hasFilters = false

  for (let key in filterStrings) {
    if (filterStrings[key] && filterStrings[key].length) {
      hasFilters = true
      break;
    }
  }

  if (hasFilters) {
    newQueryCount = Object.keys(filterStrings)
    .filter(key => filterStrings[key].length)
    .reduce((acc, cur, idx) => {
      const filterStr = filterStrings[cur]

      if (filterStr.length) {
        if (idx > 0) {
          acc = `${acc} AND ${filterStr}`
        } else {
          acc = `${acc} ${filterStr}`
        }
      }

      return acc
    }, `${newQueryCount} WHERE `)
  }

  return newQueryCount
}
