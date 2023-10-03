"use client";
import { Button, Grid, Item } from "@mui/material";
import ViewWrapper from "../../lib/ViewWrapper";
import Members from "./Members";
import TextStaggeredAnimation from "../../lib/TextStaggeredAnimation";
import TextSlideAnimation from "../../lib/TextSlideAnimation";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import {styled} from 'styled-components'


const Container = styled(ViewWrapper)`
  position: absolute;
  z-index: 100;
  top: 100% !important; 
  left: 0;
  display: flex;
  gap: 20px;
  padding: 50px 25px;
`

const GridContainer = styled(Grid)`
  height: 40em;
`

const InnerGrid = styled(Grid)`
  text-align: center;

  h2 {
    font-size: var(--font-6x-large) ;
    text-align: center;
  }

  section{
    text-align: center;
    font-size: var(--font-large);
  }

  button{
    display: block;
    margin: 0.5em auto;

  }

  @media screen and (max-width: 768px) {
      h2 {
        font-size: var(--font-4x-large) ;
        text-align: center;
      }

      p{
        text-align: center;
        font-size: var(--font-medium-large);
      }
    }


    @media screen and (max-width: 480px) {
      h2 {
        font-size: var(--font-2x-large) ;
        text-align: center;
      }

      p{
        text-align: center;
        font-size: var(--font-medium);
      }

    }


`

function About({ setActive }) {
  const { ref, inView, _ } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const link = "https://www.bristolsu.org.uk/groups/bristol-data-science-society-3cab"
  return (
    <Container id={"About"} setActive={setActive}>
      <GridContainer
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <InnerGrid item xs={8} ref={ref}>
          <h2>
          <TextSlideAnimation>
            About Us
          </TextSlideAnimation>
          </h2>
          <section>
          {inView && <TextStaggeredAnimation texts={[`Our main objective is to inform and train students on the growing field of data science, guiding members to their first step towards a career in the field, and providing a platform connect with like-minded data science enthusiasts.`]}/>}
          </section>
          <motion.div
            initial={{
              scale:0,
              opacity:0
            }}
            animate={{
              scale:1,
              opacity:1
            }}
            transition={{
              type: "spring",
              delay : 6,
              duration: 1
            }}
          >
            <Button onClick={() => location.href = link} variant="contained" color="primary">
              Read more
            </Button>
          </motion.div>
        </InnerGrid>
      </GridContainer>
      <Members/>
    </Container>
  );
}

export default About;
