import { Card, CardContent, CardHeader, CardMedia, CardActions, Button, Stack, List, ListItem , ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import ViewWrapper from "../../lib/ViewWrapper";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AccessTime, LocationOn, CalendarMonth } from "@mui/icons-material";
import {motion} from "framer-motion";
import { useInView } from 'react-intersection-observer';
import TextSlideAnimation from "../../lib/TextSlideAnimation";


const Container = styled(ViewWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;

`
const Cards = styled(Stack)`
  padding: 4em;

`

const Section = styled.div`
  position: relative;
  /* height: 100%; */
`

const Text = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size : var(--font-4x-large);
  }


    @media screen and (max-width: 480px) {
      h2 {
        font-size: var(--font-2x-large) ;
        text-align: center;
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
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/events?populate=*`,reqOptions);

  const res = await req.json()
  console.log(res)
  return res.data;
}

function Events({ setActive }) {
  const [data, setData] = useState([])
  const { ref, inView, _ } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  
  useEffect(() => {
    fetchInfo()
      .then(data => setData(data))
  },[])

  return <Container id={"Upcoming"} setActive={setActive}>
        <Section ref={ref}>
          <Text>
            {inView && <TextSlideAnimation>
              <h2>Upcoming</h2>
            </TextSlideAnimation>}
          </Text>
          <Cards   
            alignItems="center"
            justifyContent="center"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            >

          {inView && data.map(({id , attributes}) =>
          <motion.div
          key={id}
          initial={{
            opacity: 0,
            translateX: id % 2 === 0 ? -50 : 50,
            translateY: -50,
          }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.3, delay: id * 0.2 }}
          whileHover={{
            scale:1.02,
            y: -10,
            transition:{
              duration: 0.1,
              delay:0,
            }
          }}
          > 
            <Card 
            id={id}
            key={id} 
            sx={{ width: "20em" }}
            >
              <CardMedia
                  component="img"
                  height="194"
                  image={`${process.env.NEXT_PUBLIC_API}${attributes.image.data.attributes.url}`}
                  />
              <CardHeader         
                title={attributes.title}
                // subheader={`  ${attributes.time.slice(0,5)}  | ${(new Date(attributes.date)).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}).replaceAll(",","") }`}
                />
              <CardContent>
                <List style={{ width : "100%"}}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    <AccessTime/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={attributes.time.slice(0,5)} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    <CalendarMonth/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary= {(new Date(attributes.date)).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}).replaceAll(",","") }
                    />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    <LocationOn/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={attributes.location}
                    />
                </ListItem>
              </List>
              </CardContent>
              <CardActions>
                <Button 
                  onClick={()=> location.href= attributes.link}
                  size="small"
                  >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </motion.div> 
            )}
          </Cards>
      </Section>
  </Container>;
}

export default Events;
