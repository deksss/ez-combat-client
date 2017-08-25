import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  animation: shown 1s;

  @keyframes shown {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`

export default Item
