import dataLayer from "../services/dataLayer"
import * as queries from "../common/queries"

const hasFilters = filterStrings => {
  for (let key in filterStrings) {
    if (filterStrings[key] && filterStrings[key].length) {
      return true
    }
  }
  return false
}

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

  if (hasFilters(filterStrings)) {
    newQueryCount = Object.keys(filterStrings)
    .filter(key => filterStrings[key].length)
    .reduce((acc, cur, idx) => {
      const filterStr = filterStrings[cur]

      if (idx > 0) {
        acc = `${acc} AND ${filterStr}`
      } else {
        acc = `${acc} ${filterStr}`
      }

      return acc
    }, `${newQueryCount} WHERE `)
  }

  return newQueryCount
}

export const filterLine = (chartsState) => {
  const { bar: { selected } } = chartsState
  const { key0: city, key1: carrier } = selected

  const filterStrings = dataLayer({
    destCity: city,
    carrierName: carrier
  })

  let newQueryLine = `${queries.line}`

  if (hasFilters(filterStrings)) {
    const [part1, part2] = newQueryLine.split("GROUP")
    newQueryLine = Object.keys(filterStrings)
      .filter(key => filterStrings[key].length)
      .reduce((acc, cur, idx) => {
        const filterStr = filterStrings[cur]

        if (idx > 0) {
          acc = `${acc} AND ${filterStr}`
        } else {
          acc = `${acc} ${filterStr}`
        }

        return acc
      }, `${part1} WHERE`)
    newQueryLine = `${newQueryLine} GROUP ${part2}`
  }

  return newQueryLine
}
