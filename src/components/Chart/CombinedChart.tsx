import { useState } from 'react';
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
  Cell,
} from 'recharts';
import styled from 'styled-components';

import CustomTooltip from './CustomTooltip';

type CombinedChartDataType = {
  id: string;
  time: string;
  value_area: number;
  value_bar: number;
};

interface CombinedChartProps {
  data: CombinedChartDataType[];
  width?: string;
  heigth?: string;
}

const CombinedChart = ({ data, width = '100%', heigth = '500px' }: CombinedChartProps) => {
  const [filteredId, setFilteredId] = useState('');
  const idSet = new Set(data.map((item) => item.id));
  const idArray = Array.from(idSet);

  const filterData = (id: string) => {
    if (id === filteredId) {
      setFilteredId('');
    } else {
      setFilteredId(id);
    }
  };

  const formatDateStringToTime = (dateString: string) => {
    const inputDate = new Date(dateString);
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const seconds = inputDate.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ChartWrapper $heigth={heigth} $width={width}>
      <div>
        <span>필터링 : </span>
        {idArray.map((id) => (
          <FilterButton
            key={id}
            $isSelected={id === filteredId}
            type="button"
            onClick={() => filterData(id)}
          >
            {id}
          </FilterButton>
        ))}
      </div>
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={data}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          width={500}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time', position: 'bottom', offset: -5 }}
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
          <Tooltip content={CustomTooltip} />
          <Legend height={36} verticalAlign="top" />
          <Bar
            barSize={20}
            dataKey="value_bar"
            fill="#ea971c"
            yAxisId="bar"
            onClick={(e) => filterData(e.id)}
          >
            {data.map((item) => (
              <Cell key={item.id} fill={item.id === filteredId ? '#945900' : '#ea971c'} />
            ))}
          </Bar>
          <Area
            dataKey="value_area"
            fill="#0029f4"
            stroke="#0029f4"
            type="monotone"
            yAxisId="area"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default CombinedChart;

const ChartWrapper = styled.div<{ $width: string; $heigth: string }>`
  box-sizing: border-box;
  width: ${({ $width }) => $width};
  height: ${({ $heigth }) => $heigth};
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FilterButton = styled.button<{ $isSelected: boolean }>`
  margin-right: 10px;
  padding: 4px 8px;
  border: 1px solid #666;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${({ $isSelected }) => ($isSelected ? '#666' : '#fff')};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '#666')};
`;
