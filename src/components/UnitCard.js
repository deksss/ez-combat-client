import styled from 'styled-components';

const UnitCard = styled.div`
  minWidth: 200px;
  align-items: center;
  animation: shown 1s;

  @keyframes shown {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

export default UnitCard
