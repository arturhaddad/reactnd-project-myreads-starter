import styled from "styled-components";

export const Book = styled.li`
  .book-cover {
    width: 128px;
    height: 188px;
    background: no-repeat top center;
    background-size: cover;
  }

  .book-cover.empty-thumbnail-true {
    background-size: inherit;
    background-position: center;
  }
`;
