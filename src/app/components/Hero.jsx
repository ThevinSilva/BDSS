import { Button } from "@mui/material";
import {styled} from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import LogoAnimation from "../../lib/LogoAnimation";

const Section = styled.div`
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("https://spaces.w3schools.com/images/KRELIShKxTM.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-box-shadow: inset 0px 0px 300px 0px rgba(255, 255, 255, 0.3);
  -moz-box-shadow: inset 0px 0px 3000px 2000px rgba(255, 255, 255, 0.3);
  box-shadow: inset 0px 0px 300px 2000px rgba(255, 255, 255, 0.8);
`

const TextContainer = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  text-align: center;

  p , span {
    font-family: 'Quicksand', sans-serif;
    padding: 1em;
  }

  span {  font-size: var(--font-2x-large); } 
  p {  font-size: var(--font-x-large); } 

  @media screen and (max-width: 768px) {
    span {  font-size: var(--font-x-large); } 
    p {  font-size: var(--font-large); } 
  }

  @media screen and (max-width: 480px) {
    span {  font-size: var(--font-large); } 
    p {  font-size: var(--font-large); } 
  }
`

function Hero() {
  return (
    <Section>
      <TextContainer>
        <motion.span
          initial={{
            opacity:0,
            y: 100
          }}
          animate={{
            opacity: 1,
            y:0,
          }}
          transition={{ 
            type: "spring",
            duration: 0.8 }}
        >
          Shape your future with data
        </motion.span>
        <LogoAnimation/>
        <motion.p
          initial={{
            opacity:0,
            y: 100
          }}
          animate={{
            opacity: 1,
            y:0,
          }}
          transition={{ 
            type: "spring",
            duration: 0.8 }}
        >
          Introduce you to Data Science
        </motion.p>
        <motion.div
          initial={{
            scale:0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{ 
            type: "spring",
            duration: 0.8 }}
        >
          <Button 
          variant="contained" 
          color="primary"
          onClick={(e,id) => {
            document.querySelector(`#Upcoming`).scrollIntoView()
          }}
          >
            OUR EVENTS
          </Button>
        </motion.div>
      </TextContainer>
    </Section>
  );
}

export default Hero;
