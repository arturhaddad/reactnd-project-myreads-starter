import styled from "styled-components";

export const Loading = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 20px;
`;

export const LoadingMove = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.95;
  background: #fff;
  z-index: 1;
  top: 0;

  figure {
    max-width: 200px;
    max-height: 200px;

    img {
      width: 100%;
    }
  }
`;
