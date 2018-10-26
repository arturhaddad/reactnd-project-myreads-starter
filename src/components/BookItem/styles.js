import styled from "styled-components";

export const Book = styled.li`
  .book-cover {
    width: 128px;
    height: 188px;
    background: no-repeat center;
    background-size: cover;
  }

  .book-cover.empty-thumbnail-true {
    background-size: inherit;
  }
`;
