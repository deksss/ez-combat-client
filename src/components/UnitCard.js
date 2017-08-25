import styled from 'styled-components';

const UnitCard = styled.div`
  border: 1px solid grey;
  minWidth: '200px';
  margin: 5px;
  align-items: center;
  animation: shown 1s;

  @keyframes shown {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

export default UnitCard
