import React from "react";
import Reading from "../../assets/reading.gif";
import { Container } from "./styles";

const LoadingMove = () => (
  <Container>
    <figure>
      <img src={Reading} alt="Loading book move" />
    </figure>
  </Container>
);

export default LoadingMove;
