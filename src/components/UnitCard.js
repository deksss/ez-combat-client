import styled from 'styled-components';

const UnitCard = styled.div`
  width: 340px;
  min-height: 200px;
  height: 100%;
  align-items: center;
  animation: shown 1s;

  @keyframes shown {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

export default UnitCard
