import { timeFormat } from 'd3-time-format'
import sls from 'single-line-string'

const dateFormatter = timeFormat('%Y-%m-%d %H:%M:%S')

// parses input data into SQL bits to be used for filters in chart queries
export default function({ dateRange }) {
  let dateFilterStr = ''

  if (dateRange && Array.isArray(dateRange) && dateRange.length) {
    const [min, max] = dateRange
    dateFilterStr = sls`(
      dep_timestamp >= TIMESTAMP(0) '${dateFormatter(min)}'
      AND dep_timestamp <= TIMESTAMP(0) '${dateFormatter(max)}'
    )`
  }

  return {
    dateFilterStr
  }
}
