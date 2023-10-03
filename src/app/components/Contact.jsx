import ViewWrapper from "../../lib/ViewWrapper";
import styled from "@emotion/styled";
import { TextField, Grid, Button, Stack, Divider, Snackbar, Alert } from '@mui/material';
import { useState } from "react";
import { Instagram, Twitter, Facebook, LinkedIn, Send  } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import TextSlideAnimation from "../../lib/TextSlideAnimation";
import TextStaggeredAnimation from "../../lib/TextStaggeredAnimation";

const Container = styled(ViewWrapper)``

const GridContainer = styled(Grid)`
  /* height: 70vh; */
  /* margin-bottom: 5em; */

  /* @media screen and (max-width: 795px) {
    height: 150vh !important;
    } */
`

const Info = styled.div`
  display: flex;
  flex-direction:column ;
  justify-content: center;
  align-items: center;
  
  h2 {
    font-size : var(--font-7x-large);
  }

  section {
    font-size : var(--font-large);
    width: 75%;
    text-align: center;
    margin-bottom:2em;
  }

  @media screen and (max-width: 795px) {
      h2 {
        font-size: var(--font-4x-large) ;
        text-align: center;
      }

      section {
        text-align: center;
        font-size: var(--font-large);
      }

    }

    @media screen and (max-width: 480px) {
      h2 {
        font-size: var(--font-2x-large) ;
        text-align: center;
      }

      section {
        text-align: center;
        font-size: var(--font-large-medium);
      }

    }

`

const Form = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: var(--nav-color);
  color: white;
  border-radius: 1em;
  width: 30em;
  height: 35em;
  margin: 1em auto !important;

  > *{
    width: 27em;
  }

  Button {
    margin: 0 auto;
    margin-top: 2em;
    width: 27em;

  }

  @media screen and (max-width: 1200px) {
    width: 25em;
    height: 33em;

    > *{
      width: 22em;
    }

    Button {
      margin: 1em !important;
      margin: 0 auto;
      width: 10em;
    }

    }


  @media screen and (max-width: 795px) {
    width: 25em;
    height: 33em;

    > *{
      width: 22em;
    }

    Button {
      margin: 1em !important;
      margin: 0 auto;
    }

    }

  @media screen and (max-width: 480px) {
      width: 20em;
      height: 27em;

      > *{
        width: 17em;
        margin-top: 1em !important;

      }

      Button {
        margin: 1em auto !important;
        width: 10em ;
      }


    }

`

const Icons = [
  {component : <Instagram fontSize={'large' }/>, link : "https://www.instagram.com/bristol_dss/"},
  {component : <Twitter fontSize={'large' }/>, link : "https://twitter.com/bristol_dss"},
  {component : <Facebook fontSize={'large' }/>, link : "https://www.facebook.com/BristolDSS/"},
  {component : <LinkedIn fontSize={'large' }/>, link : "https://www.linkedin.com/company/bristol-data-science-society/"},
]

const handleSubmit = async (name, email, text, setResponse) => {
  const res = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, text}),
  })
  const data = await res.json()
  if(data.statusCode < 300 && data.statusCode >= 200 ) setResponse(true);
  else setResponse(false);
  console.log(data.message)
}

function Contact({ setActive }) {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const [ response, setResponse ] = useState(null)
  const { ref, inView, _ } = useInView({
    threshold: 0.9,
    triggerOnce: true
  });

  return <Container id={"Contact"} setActive={setActive}> 
  <GridContainer
    ref={ref}
    container
    direction="row"
    justifyContent="center"
    alignItems="center" 
    spacing={2} 
    columns={16}
  >
  <Grid item xs={16} md={8}>
    <Info>
      {inView && <TextSlideAnimation>
        <h2>Contact us</h2>
      </TextSlideAnimation>}
    {inView &&
      <section>
        <TextStaggeredAnimation
          texts={[`Need to get in touch with us? Either fill out the form with your inquiry or email bristol.dss2019@gmail.com.`]}  
        />
      </section>
    }
    {inView &&
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
        delay : 2,
        duration: 1
      }}
      >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {Icons.map(({ component , link },i) => 
        <motion.div
            key={i} 
            whileHover={{
              scale : 1.2
            }}
            onClick={() => location.href = link }
        >
          {component}
        </motion.div>
          )}
      </Stack>
      </motion.div>}
    </Info>
  </Grid>  
  <Grid item xs={16} md={8}>
   {inView &&
    <Form
      initial={{  
        x : 500,
        Opacity : 0
      }}

      animate={{
        x : 0,
        Opacity : 1
      }}

      transition={{
        type:"spring"
      }}
    >

      <TextField
        key="1"
        label="Name"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{
          style: {
            color: "white",
          },
        }}
      />
      <TextField
        label="E-mail"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        inputProps={{
          style: {
            color: "white",
          },
        }}
      />
      <TextField
        multiline
        label="Content"
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        inputProps={{
          style: {
            height: "10em",
            color: "white",
            overflowY: "scroll"
          },
        }}
      />
      <Button variant="contained" color="success" onClick={(e) => {
        e.preventDefault()
        handleSubmit(name, email, text, setResponse);
      }}>
        submit	&nbsp; <Send/>
      </Button>
    </Form>
    }
  </Grid>
  </GridContainer>
  <Snackbar open={response !== null} autoHideDuration={6000} onClose={() => setResponse(null)}>
   
      <Alert open={true} severity={response === true ? "success" : "error"}  sx={{ width: '100%' }}>
      {response ? "The message was sent succesfully" :  "Something went wrong"}
      </Alert>
  </Snackbar>

  </Container>;
}

export default Contact;
