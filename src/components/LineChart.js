import React from 'react'
import PropTypes from 'prop-types'
import { XYFrame } from 'semiotic'
import { scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'
import { extent } from 'd3-array'

// semiotic expects data in a certain format
const formatData = data => {
  return data.reduce((acc, cur) => {
    const group = acc.find(d => d.key1 === cur.key1)

    if (acc.length && group) {
      group.coordinates.push(cur)
    } else {
      acc.push({
        key1: cur.key1,
        coordinates: [cur]
      })
    }

    return acc
  }, [])
}

const dateFormatter = timeFormat('%Y-%m-%d')

const LineChart = ({ data }) => {
  const dataFormatted = formatData(data)
  console.log(dataFormatted, extent(data, d => d.key0))

  return (
    <div className="line-chart">
      <XYFrame
        title={'Flights'}
        size={[700, 400]}
        lines={dataFormatted}
        xAccessor={"key0"}
        yAccessor={"val"}
        xScaleType={scaleTime()}
        xExtent={extent(data, d => d.key0)}
        lineStyle={{ stroke: "#00a2ce" }}
        margin={{ left: 80, bottom: 75, right: 10, top: 40 }}
        axes={[
          {
            orient: "left"
          },
          {
            orient: "bottom",
            tickFormat: d => dateFormatter(d),
            rotate: 90
          }
        ]}
        hoverAnnotation={true}
      />
    </div>
  )
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
}

export default LineChart
