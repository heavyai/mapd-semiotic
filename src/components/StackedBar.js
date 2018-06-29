import React from "react"
import PropTypes from "prop-types"
import { OrdinalFrame } from "semiotic"
import { schemeSet1 } from 'd3-scale-chromatic'

import '../styles/chart-default-styles.css'

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

const colorHash = new Map(kvArray)

const StackedBar = ({ data }) => {
  data = data.filter(d => d.key1 !== "undefined")

  return (
    <div className="chart stacked-bar">
      <OrdinalFrame
        title={'Avg Arrdelay By Dest_city, Carrier_name'}
        size={[700, 400]}
        data={data}
        style={d => ({ fill: colorHash.get(d.key1), stroke: '#fff' })}
        oAccessor={"key0"}
        rAccessor={"val"}
        type="bar"
        axis={{ orient: "left", label: "avg arrdelay"}}
        margin={{ left: 80, bottom: 100, right: 10, top: 40 }}
        oPadding={5}
      />
    </div>
  )
}

StackedBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
}

export default StackedBar
