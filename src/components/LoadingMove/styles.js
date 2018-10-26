import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.95;
  background: #fff;
  z-index: 6;
  top: 0;

  figure {
    max-width: 200px;
    max-height: 200px;

    img {
      width: 100%;
    }
  }
`;
