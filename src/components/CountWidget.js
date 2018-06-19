import React from "react";
import PropTypes from "prop-types";
import sls from 'single-line-string'

const CountWidget = ({ count, total }) => (
  <div className="count-widget">
    <p>
      {sls`Showing
      ${count ? count[0].val.toLocaleString() : ""} of
      ${total ? total[0].val.toLocaleString() : ""} total rows`}
    </p>
  </div>
);

CountWidget.propTypes = {
  count: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.arrayOf(PropTypes.shape({}))
};

export default CountWidget;
