import React from "react"
import PropTypes from "prop-types"
import { OrdinalFrame } from "semiotic"
import { schemeSet1 } from 'd3-scale-chromatic'
import { format } from 'd3-format'

import '../styles/chart-default-styles.css'
import '../styles/StackedBar.css'

const formatter = format(".4s")

const airlines = [
  'Mesa Airlines',
  'Atlantic Southeast Airlines',
  'Piedmont Aviation',
  'JetBlue Airways',
  'AirTran Airways Corporation'
]

const kvArray = airlines.reduce((acc, cur, i) => {
  acc.push([cur, schemeSet1[i]])
  return acc
}, [])

const colorMap = new Map(kvArray)

const StackedBar = ({ data }) => {
  data = data.filter(d => d.key1 !== "undefined")

  return (
    <div className="chart stacked-bar">
      <OrdinalFrame
        title={'Avg Arrdelay By Dest_city, Carrier_name'}
        size={[1400, 400]}
        data={data}
        style={d => ({ fill: colorMap.get(d.key1), stroke: '#fff' })}
        oAccessor={"key0"}
        rAccessor={"val"}
        type="bar"
        axis={{ orient: "left", label: "avg arrdelay"}}
        margin={{ left: 80, bottom: 100, right: 10, top: 40 }}
        oPadding={5}
        oLabel={d => (
          <text transform="translate(-15,0) rotate(45)">{d}</text>
        )}
        pieceHoverAnnotation={true}
        tooltipContent={d => (
          <div className="tooltip-content">
            <p>{d.key0}</p>
            <p>{d.key1}</p>
            <p>{formatter(d.val)}</p>
          </div>
        )}
      />
    </div>
  )
}

StackedBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
}

export default StackedBar
