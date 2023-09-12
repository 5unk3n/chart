import CombinedChart from '../components/Chart/CombinedChart';
import mockData from '../data/mock_data.json';

const MainPage = () => {
  const responseEntries = Object.entries(mockData.response);
  const formattedData = responseEntries.map(([time, values]) => ({
    id: values.id,
    time,
    value_area: values.value_area,
    value_bar: values.value_bar,
  }));

  return (
    <>
      <CombinedChart data={formattedData} />
    </>
  );
};

export default MainPage;
