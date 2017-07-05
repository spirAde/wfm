import React, { PropTypes, Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import classNames from 'classnames/bind';

import { Heading } from '../UI';

import styles from './PerformanceChart';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const cx = classNames.bind(styles);

class PerformanceChart extends Component {
  render() {
    const { accountType } = this.props;

    return (
      <div className={cx('PerformanceChart')}>
        <Heading text={`Your ${accountType} account performance`} />
        <div>
          <LineChart
            width={566}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    );
  }
}

PerformanceChart.displayName = 'PerformanceChart';

PerformanceChart.propTypes = {
  accountType: PropTypes.oneOf(['investment', 'retirement']),
};

PerformanceChart.defaultProps = {
  accountType: 'investment',
};

export default PerformanceChart;
