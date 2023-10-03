import * as React from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";

const drawerVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};


const Highlight = styled(motion.span)`
/* "absolute inset-0 z-10 bg-white mix-blend-difference" */
    display: block;
    background-color: #494f86;
    width: 100% !important;
    border-bottom:3px solid lightblue;
    position: absolute;
    inset: 0;
    mix-blend-mode: screen;
`


const Links = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    display: ${props => props.isOpen ? "flex" : "none"};
    flex-direction: column;
    margin: 0 auto;
    color: white;
    width: 100vw;
    height: 100vh !important;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
    font-family: "Courier New", monospace;

    button {
      /* removes existing styling */
      position: relative;
      height: 100% !important;
      width: 100%;
      padding: 5px !important;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      z-index: 3;
      font-size: var(--font-4x-large);


    }
  
`;


function DrawerItems ({ tabs , clickHandler, active, toggleOpen, isOpen }) { 
  return (
    <Links variants={drawerVariants} isOpen={isOpen} >
    {tabs.map( (tab , i) => 
      <motion.button 
        key={i}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          clickHandler(e,tabs[i]);
          setTimeout(() => 
            toggleOpen()
          ,1200)
        }}
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
);}



export default DrawerItems;