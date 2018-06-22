import React from 'react'
import PropTypes from 'prop-types'
import { XYFrame } from 'semiotic'
import { scaleTime, scaleOrdinal } from 'd3-scale'
import { timeFormat } from 'd3-time-format'
import { extent } from 'd3-array'
import { curveCardinal } from 'd3-shape'
import { format } from 'd3-format'
import { schemeCategory10 } from 'd3-scale-chromatic'
import throttle from 'lodash.throttle'

import '../styles/LineChart.css'
import { lineBrushStart, lineBrushMove, lineBrushEnd } from "../actions/line"

// semiotic expects data in a certain format
const formatData = data => {
  return data.reduce((acc, cur) => {
    const group = acc.find(d => d.key1 === cur.key1)

    // semiotic doesn't like null values in the x-axis, maybe there's a way to ignore them?
    if (acc.length && group && cur.key0 !== null) {
      group.coordinates.push(cur)
    }
    // ignoring the "other" category for now as it makes the other lines hard to read
    else if (cur.key1 !== "other" && cur.key0 !== null) {
      acc.push({
        key1: cur.key1,
        coordinates: [cur]
      })
    }

    return acc
  }, [])
}

const dateFormatter = timeFormat('%b')
const numberFormatter = format(".2s")

const LineChart = ({ data, dispatch }) => {
  const airports = data.reduce((acc, cur) => {
    if (acc.indexOf(cur.key1) === -1 && cur.key1 !== "other") {
      acc.push(cur.key1)
    }
    return acc
  }, [])
  const dataFormatted = formatData(data)
  const colorScale = scaleOrdinal(schemeCategory10).domain(airports)

  // brush event handlers
  function onBrushStart (dateRange) {
    dispatch(lineBrushStart(dateRange))
  }

  function onBrushMove (dateRange) {
    dispatch(lineBrushMove(dateRange))
  }

  function onBrushEnd (dateRange) {
    dispatch(lineBrushEnd(dateRange))
  }

  return (
    <div className="line-chart">
      <XYFrame
        title={'Flights: Number of Records by Departure Date: ' + airports.join(" , ")}
        size={[700, 400]}
        lines={dataFormatted}
        lineType={{ type: "line", interpolator: curveCardinal }}
        xAccessor={"key0"}
        yAccessor={"val"}
        xScaleType={scaleTime()}
        xExtent={extent(data, d => d.key0)}
        lineStyle={ d => ({ stroke: colorScale(d.key1) })}
        margin={{ left: 80, bottom: 125, right: 10, top: 40 }}
        axes={[
          {
            orient: "left",
            tickFormat: d => numberFormatter(d),
            label: "Number of Records"
          },
          {
            orient: "bottom",
            tickFormat: d => dateFormatter(d),
            label: "Departure Date"
          }
        ]}
        hoverAnnotation={true}
        tooltipContent={d =>
          <div className="tooltip-content" >
            <p>Airport: {d.key1}</p>
            <p>Count: {d.val}</p>
            <p>Date: {dateFormatter(d.key0)}</p>
         </div>}
        interaction={{
          start: onBrushStart,
          during: throttle(onBrushMove, 100),
          end: onBrushEnd,
          brush: "xBrush",
          extent: [null, null]
        }}
      />
    </div>
  )
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
}

export default LineChart
