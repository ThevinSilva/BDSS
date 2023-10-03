import {styled} from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  background-color: var(--nav-color);
  color: white;
  height: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    
  }
`

function Footer() {
  return <Container>
  <p>© 2023 - BDSS - All rights reserved</p>
  </Container>;
}

export default Footer;
