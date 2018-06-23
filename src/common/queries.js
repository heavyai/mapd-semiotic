import sls from 'single-line-string'
import { table } from "../common/config"

export const queryLineChart = sls`
  SELECT date_trunc(month, dep_timestamp) as key0,
  CASE
    WHEN origin IN ('ORD','ATL','DFW','LAX','PHX')
    THEN origin
    ELSE 'other'
  END as key1,
  COUNT(*) AS val
  FROM ${table}
  GROUP BY key0, key1
  ORDER BY key0, key1`

export const queryScatterPlot = sls`
  SELECT depdelay as x,
  arrdelay as y,
  airtime as size,
  carrier_name as color
  FROM ${table}
  LIMIT 200000
`

export const queryStackedBar = sls`
  SELECT dest_city AS key0,
  CASE
    WHEN carrier_name IN (
      'Mesa Airlines',
      'Atlantic Southeast Airlines',
      'Piedmont Aviation',
      'JetBlue Airways',
      'AirTran Airways Corporation'
    )
    THEN carrier_name
    ELSE 'undefined'
  END AS key1,
  avg(arrdelay) AS val
  FROM ${table}
  WHERE (
    dest_city IN (
      SELECT dest_city
      FROM ${table}
      GROUP BY dest_city
      ORDER BY avg(arrdelay) DESC
      LIMIT 100
    )
    OR dest_city IS NULL
  )
  GROUP BY key0, key1
`

export const queryCount = `SELECT count(*) AS val FROM ${table}` // to do: where clause

export const queryTotal = `SELECT count(*) AS val FROM ${table}`
