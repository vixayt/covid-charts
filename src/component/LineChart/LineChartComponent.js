import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import DefaultToolTipContent from 'recharts/lib/component/DefaultTooltipContent';

function LineChartComponent({ covidData }) {
  const convertDate = (date) => {
    if (date) {
      const year = date.toString().slice(2, 4);
      const month = date.toString().slice(5, 6);
      const day = date.toString().slice(6, 8);
      return `${month}-${day}-${year}`;
    }
  }
  const CustomToolTip = (props) => {
    if (props.payload === null || props.payload.length === 0) {
      return <div></div>
    }
    else if (props.payload[0] !== null) {
      const newPayload = [
        {
          name: 'Date',
          value: convertDate(props.label),
        },
        ...props.payload,
      ];
      return <DefaultToolTipContent payload={newPayload} />;
    }
    return <DefaultToolTipContent {...props} />
  }

  return (
    <LineChart width={600} height={300} data={covidData.reverse()} margin={{ top: 5, right: 20, bottom: 5, left: 15 }}>
      <Line type="monotone" dataKey="positive" stroke="#8884d8" dot={false} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" tickFormatter={timeStr => convertDate(timeStr)} />
      <YAxis />
      <Tooltip content={<CustomToolTip />} />
    </LineChart>
  )
}

export default LineChartComponent;