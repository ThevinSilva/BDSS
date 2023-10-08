"use client";
import React from "react";
import {styled} from "styled-components";
import { motion, useCycle } from "framer-motion";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MenuToggle } from "../../lib/MenuToggle";
import DrawerItems from "../../lib/DrawerItems";

const Navigation = styled(motion.div)`
  position: fixed;
  width: 100vw;
  z-index: 3;
  top: 0px;
  height: 50px;
  background-color: var(--nav-color);
  display: flex;
  margin: 0 auto;

  > * {
    padding: 0% 10%;
  }

`;

const SVG = styled(Image)`
  /* results in white color */
  filter: brightness(0) invert(1);
  height: 60%;
  padding-top: 10px;
  margin: 0 auto;
  z-index: 100;

`

const Links = styled(motion.div)`
    display: flex;
    margin: 0 auto;
    padding: 0;
    color: white;
    height: 100% !important;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
    font-family: "Courier New", monospace;

    button {
      /* removes existing styling */
      position: relative;
      height: 100% !important;
      padding: 10px !important;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      z-index: 3;

    }
  
`;

const Drawer = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--nav-color);
`

const Highlight = styled(motion.span)`
/* "absolute inset-0 z-10 bg-white mix-blend-difference" */
    display: block;
    background-color: #494f86;
    width: 100%;
    border-bottom:3px solid lightblue;
    position: absolute;
    inset: 0;
    mix-blend-mode: screen;

`

const Tabs = [
  "About",
  "Our_Events",
  "Upcoming",
  "Contact"
]

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height}px at calc(100% - 10px) 10px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(10px at calc(100% - 10px) 10px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};


const clickHandler = (e,id) => {
  document.querySelector(`#${id}`).scrollIntoView()
};

export default function Header({ active }) {
  
  const matches = useMediaQuery('(min-width:600px)');
  const [isopen, toggleOpen ] = useCycle(false, true)
  return (
    <Navigation
      initial={{
        opacity:0,
        y: -100
      }}
      animate={{
        opacity: 1,
        y:0,
      }}
      transition={{ 
        type: "spring",
        duration: 0.8 }}
      >
      <SVG
        src={"/BDSS.svg"}
        width={117}
        height={50}
        alt={"Picture of the author"}
      />
      <Links>
        {matches && Tabs.map( (tab , i) => 
          <motion.button 
            key={i}
            onClick={(e) => clickHandler(e,Tabs[i])}
          >
            {active === tab && (
              <Highlight
                // style={{ borderRadius: 9999 }}
                layoutId="active-pill"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span>{tab.replace(/_/g,' ')}</span>
          </motion.button> 
        )}
      </Links>
      {matches ||     
        <motion.nav
          initial={false}
          animate={isopen ? "open" : "closed"}
        >
        <MenuToggle toggle={() => toggleOpen()} />
        <Drawer variants={sidebar}/>
        <DrawerItems 
          tabs={Tabs} 
          clickHandler={clickHandler} 
          active={active}
          isOpen={isopen}
          toggleOpen={toggleOpen} 
        />
    </motion.nav>}
    </Navigation>
  );
}
