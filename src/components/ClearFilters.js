import React from "react"

import { clearAllChartFilters } from "../actions"

function hasValues(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      if (typeof val === "object" && !Array.isArray(val) && val !== null) {
        return hasValues(val)
      } else if (val !== null && val !== undefined && val !== "") {
        return true
      }
    }
  }
  return false
}

function chartsHaveFilters({ bar, line }) {
  return hasValues(bar) || hasValues(line)
}

const ClearFilters = ({ bar, line, dispatch }) => {
  const handleClick = () => dispatch(clearAllChartFilters())

  return chartsHaveFilters({ bar, line }) ? (
    <button onClick={handleClick}>Clear Filters</button>
  ) : null
}

export default ClearFilters
