import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type CombinedChartDataType = {
  id: string;
  time: string;
  value_area: number;
  value_bar: number;
};

interface CombinedChartProps {
  data: CombinedChartDataType[];
}

const CombinedChart = ({ data }: CombinedChartProps) => {
  const formatDateStringToTime = (dateString: string) => {
    const inputDate = new Date(dateString);
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const seconds = inputDate.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ResponsiveContainer height="100%" minHeight="300px" width="100%">
      <ComposedChart
        data={data}
        height={400}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
        width={500}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="time"
          label={{ value: '시각', position: 'bottom', offset: -5 }}
          tickFormatter={formatDateStringToTime}
        />
        <YAxis
          label={{ yAxisId: 'value_bar', value: 'Bar', angle: -90, position: 'insideLeft' }}
          yAxisId="bar"
        />
        <YAxis
          domain={[0, (dataMax: number) => dataMax * 2]}
          label={{
            yAxisId: 'value_area',
            value: 'Area',
            angle: -90,
            position: 'insideRight',
          }}
          orientation="right"
          yAxisId="area"
        />
        <Tooltip />
        <Legend height={36} verticalAlign="top" />
        <Bar barSize={20} dataKey="value_bar" fill="#85df89" yAxisId="bar" />
        <Area dataKey="value_area" fill="#5e31d1" stroke="#5e31d1" type="monotone" yAxisId="area" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CombinedChart;