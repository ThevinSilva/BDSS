import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import ViewWrapper from "../../lib/ViewWrapper";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AccessTime, LocationOn, CalendarMonth } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TextSlideAnimation from "../../lib/TextSlideAnimation";
import Image from "next/image";

const Container = styled(ViewWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Cards = styled(Stack)`
  padding: 4em;
`;

const Section = styled.div`
  position: relative;
  /* height: 100%; */
`;

const NoEvents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px !important;

  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-x-large);
  }
`;

const Text = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: var(--font-4x-large);
  }

  @media screen and (max-width: 480px) {
    h2 {
      font-size: var(--font-2x-large);
      text-align: center;
    }
  }
`;

const SVG = styled(Image)`
  /* results in white color */
  width: 100%;
  padding-top: 10px;
  margin: 0 auto;

`;


const fetchInfo = async () => {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 3600 },
  };
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/events?populate=*`,
    reqOptions
  );

  const res = await req.json();
  console.log(res.data);
  return res.data;
};

function Events({ setActive }) {
  const [data, setData] = useState([]);
  const { ref, inView, _ } = useInView({

    threshold: 0.5,
    triggerOnce: true,

  });

  useEffect(() => {
    fetchInfo().then((data) => setData(data));
  }, []);

  return (
    <Container id={"Upcoming"} setActive={setActive}>
      <Section ref={ref}>
        <Text>
          {inView && (
            <TextSlideAnimation>
              <h2>Upcoming</h2>
            </TextSlideAnimation>
          )}
        </Text>
        <Cards
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          {inView &&
            (data != null ? (
              data.map(({ id, attributes }) => (
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
                    scale: 1.02,
                    y: -10,
                    transition: {
                      duration: 0.1,
                      delay: 0,
                    },
                  }}
                >
                  <Card id={id} key={id} sx={{ width: "20em" }}>
                    <CardMedia
                      component="img"
                      height="194"
                      sx={{ objectFit: "contain" }}
                      image={`${attributes.image.data.attributes.url}`}
                    />
                    <CardHeader
                      title={attributes.title}
                      // subheader={`  ${attributes.time.slice(0,5)}  | ${(new Date(attributes.date)).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}).replaceAll(",","") }`}
                      subheader={
                        <List style={{ width: "100%" }}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AccessTime />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={attributes.time.slice(0, 5)}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <CalendarMonth />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={new Date(attributes.date)
                                .toLocaleDateString("en-us", {
                                  weekday: "long",
                                  month: "short",
                                  day: "numeric",
                                })
                                .replaceAll(",", "")}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <LocationOn />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={attributes.location} />
                          </ListItem>
                        </List>
                      }
                    />

                    <CardContent></CardContent>
                    <CardActions>
                      <Button
                        onClick={() => (location.href = attributes.link)}
                        size="small"
                      >
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              ))
            ) : (
              <NoEvents>
                <SVG
                  src={"/presentation-d.svg"}
                  width={500}
                  height={500}
                  alt={"No Events"}
                />
                <h4>No Events</h4>
              </NoEvents>
            ))}
        </Cards>

      </Section>
    </Container>
  );
}

export default Events;
