"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Break = styled.div`
    width: 100%;
    height: 1em;
`;

const boldWords = [
    "every",
    "student",
    "Personal",
    "Tutor.",
    "never",
    "before",
    "much",
];

const Container = styled(motion.div)`
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > * {
        text-align: center;
    }
`;

const TextStaggeredAnimation = ({ texts, ...props }) => {
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.01 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <Container
            variants={container}
            initial="hidden"
            animate="visible"
            {...props}>
            {texts.map((words, i) => (
                <React.Fragment key={i}>
                    {words.split(" ").map((word, index) => (
                        <motion.span
                            variants={child}
                            style={{
                                marginRight: "0.3rem",
                                textAlign: "center",
                            }}
                            key={index}>
                            {boldWords.includes(word) ? (
                                <strong>{word}</strong>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                    {i !== texts.length - 1 && <Break />}
                </React.Fragment>
            ))}
        </Container>
    );
};

export default TextStaggeredAnimation;
