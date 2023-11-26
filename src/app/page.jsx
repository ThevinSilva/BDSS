"use client";

import { styled } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import theme from "./Theme.js";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material";
import { useState, useRef, useEffect } from "react";

const Header = dynamic(() => import("./components/Header"));
const Hero = dynamic(() => import("./components/Hero"));
const About = dynamic(() => import("./components/About"));
const Contact = dynamic(() => import("./components/Contact"));
const OurEvents = dynamic(() => import("./components/OurEvents"));
const Events = dynamic(() => import("./components/Events"));
const Footer = dynamic(() => import("./components/Footer"));

const MainContent = styled.div`
  position: relative !important;
  width: 100vw;
  height: 100%;
  overflow-x: clip !important;
`;

const Panels = styled.div`
  position: absolute;
  background-color: white;
  top: 100vh;
  width: 100vw;
  left: 0px;
  scrollbar-width: none;
`;

function Home() {
  const [active, setActive] = useState("");
  const [pannels, setPannels] = useState();
  const ref = useRef(false);

  useEffect(() => {
    setPannels(ref.current.children);
    document.title = "Bristol Data Science Society";
  }, [ref]);

  return (
    <MainContent>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header active={active} pannels={pannels} />
        <Hero setActive={setActive} />
        <Panels>
          <About setActive={setActive} />
          <OurEvents setActive={setActive} />
          <Events setActive={setActive} />
          <Contact setActive={setActive} />
          <Footer setActive={setActive} />
        </Panels>
      </ThemeProvider>
    </MainContent>
  );
}

export default Home;
