import styled from "styled-components";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  animation: shown 1s;
  padding-left: 20px;
  padding-right: 20px;

  @keyframes shown {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Item;
