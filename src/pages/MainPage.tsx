import styled from 'styled-components';

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
    <MainPageWrapper>
      <StyledH1>시계열 차트</StyledH1>
      <CombinedChart data={formattedData} />
    </MainPageWrapper>
  );
};

export default MainPage;

const MainPageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledH1 = styled.h1`
  text-align: center;
`;
