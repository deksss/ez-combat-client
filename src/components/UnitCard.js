import styled from 'styled-components';

const UnitCard = styled.div`
  width: 400px;
  min-height: 200px;
  align-items: center;
  animation: shown 1s;

  @keyframes shown {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

export default UnitCard
