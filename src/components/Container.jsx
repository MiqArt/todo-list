import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  @media(min-width: 576px) {
    max-width: 540px;
  };
  @media(min-width: 768px) {
    max-width: 720px;
  };
  @media(min-width: 992px) {
    max-width: 960px;
  };
`;

export default Container;
