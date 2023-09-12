import { TooltipProps } from 'recharts';
import styled from 'styled-components';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && label) {
    const id = payload[0].payload.id;

    return (
      <CustomTooltipWrapper>
        <CellPara>{`id : ${id}`}</CellPara>
        {payload.map((item) => (
          <CellPara
            key={item.dataKey}
            $color={item.color}
          >{`${item.dataKey} : ${item.value}`}</CellPara>
        ))}
        <CellPara>{`time: ${label}`}</CellPara>
      </CustomTooltipWrapper>
    );
  }
};

export default CustomTooltip;

const CustomTooltipWrapper = styled.div`
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CellPara = styled.p<{ $color?: string }>`
  margin: 4px 0;
  color: ${({ $color }) => $color};
`;
