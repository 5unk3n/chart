import { TooltipProps } from 'recharts';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && label) {
    const id = payload[0].payload.id;

    return (
      <div>
        <p>{`id : ${id}`}</p>
        {payload.map((item) => (
          <p key={item.dataKey}>{`${item.dataKey} : ${item.value}`}</p>
        ))}
        <p>{`time: ${label}`}</p>
      </div>
    );
  }
};

export default CustomTooltip;
