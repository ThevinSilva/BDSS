import ViewWrapper from "../../lib/ViewWrapper";
import {styled} from "styled-components";
import { Grid } from "@mui/material";
import {motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';



const Container = styled(ViewWrapper)`
  height: 30em;

  @media screen and (max-width: 1200px) {
    height: auto;
    }

`

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size : var(--font-4x-large);
    margin-top: 2em;
  }

  @media screen and (max-width: 768px) {
      h2 {
        font-size: var(--font-4x-large) ;
      }
    }


    @media screen and (max-width: 480px) {

      h2 {
        font-size: var(--font-2x-large) ;
      }
    }
`

const OuterGrid = styled(Grid)`
  padding: 0em 5em;
  margin-bottom: 10em !important;
  height: 100vh;
  @media screen and (max-width: 1200px) {
    height: auto !important;
    }
`

const InnerGrid = styled(Grid)`
  text-align: center;
`

const Info = styled(motion.div)`
  flex-direction: column;
  border: solid 0.25em white;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  padding: 13% 3% 0% 3%;
  height: 17em ;
  border-radius: 1em;
  background: white;
  color: black;
  overflow-y: scroll;

  h3{
    font-size : var(--font-x-large);
    color: var(--nav-link-hover-color);
  }

  p{
    font-size : var(--font-large);
  }

  @media screen and (max-width: 768px) {
    height: 15em ;

      h3 {
        font-size: var(--font-x-large) ;
        text-align: center;
      }

      p{
        text-align: center;
        font-size: var(--font-medium-large);
      }
    }


    @media screen and (max-width: 480px) {
      height: 13em ;
      h3 {
        font-size: var(--font-medium-large) ;
        text-align: center;
      }

      p{
        text-align: center;
        font-size: var(--font-medium);
      }

    }


`

const fetchInfo = async () => {

  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    },
    next : { revalidate: 3600 }
  }
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/infos`,reqOptions);

  const res = await req.json()
  return res.data;
}

function OurEvents({ setActive }) {
  const { ref, inView, _ } = useInView({
    threshold: 0.2,
    triggerOnce : true
  });
  const [data , setData] = useState([])

  useEffect(() => {
    fetchInfo()
      .then((data) => setData(data));
  },[])

  return (
    <Container id={'Our_Events'} setActive={setActive}>
      <Text>
        <h2>Our Events</h2>
      </Text>
      <OuterGrid ref={ref} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {inView && data.map(({id , attributes}, i) =>  
          <InnerGrid 
          key={i} 
          item xs={4} 
          sm={4} 
          md={4}
          >
            <Info
              initial={{
                opacity: 0,
                translateX: i % 2 === 0 ? -50 : 50,
                translateY: -50,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >
              <h3>{attributes.title}</h3>
              <p>{attributes.description}</p>
              </Info>
          </InnerGrid>
        )}
      </OuterGrid>
    </Container>
  );
}

export default OurEvents;
