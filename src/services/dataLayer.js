import { timeFormat } from 'd3-time-format'
import sls from 'single-line-string'

const dateFormatter = timeFormat('%Y-%m-%d %H:%M:%S')

// parses input data into SQL bits to be used for filters in chart queries
export default function({ dateRange, destCity, carrierName }) {
  let dateFilterStr = ''
  let destCityFilterStr = ''
  let carrierNameFilterStr = ''

  if (dateRange && Array.isArray(dateRange) && dateRange.length) {
    const [min, max] = dateRange
    dateFilterStr = sls`(
      dep_timestamp >= TIMESTAMP(0) '${dateFormatter(min)}'
      AND dep_timestamp <= TIMESTAMP(0) '${dateFormatter(max)}'
    )`
  }

  if (destCity && typeof destCity === "string") {
    destCityFilterStr = `dest_city = '${destCity}'`
  }

  if (carrierName && typeof carrierName === "string") {
    carrierNameFilterStr = `carrier_name = '${carrierName}'`
  }

  return {
    dateFilterStr,
    destCityFilterStr,
    carrierNameFilterStr
  }
}
