import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import Image from "next/image";

const Section = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  text-align: center;
  background-color: rgb(51, 57, 109);


  h2 {
    font-size: var(--font-x-large);
    color: white !important;
  }
`;

const Container = styled(motion.div)`
  cursor: grab;
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin: 0em auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  width: fit-content;
  height: 30rem;
`;

const Card = styled(motion.div)`
  display: block;
  height: 25rem;
  width: 20rem;
  padding: 1em;
  margin: 2em;
  background: white;
  border-radius: 1em;
  color: black;
  -webkit-box-shadow: 11px 13px 28px -10px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 11px 13px 28px -10px rgba(0, 0, 0, 0.55);
  box-shadow: 11px 13px 28px -10px rgba(0, 0, 0, 0.55);

  > div {
    padding-top: 1em;
  }
`;

const staggeredVarients = (index) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.5,
      },
    },
  };
};

const Cards = ({ members }) => (
  <>
    {" "}
    {members && members.map(({ id, attributes }, index) => (
      <Card
        id={id}
        key={id}
        variants={staggeredVarients(index)}
        initial="hidden"
        animate="visible"
      >
        <Image
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={500}
          src={`${attributes.image.data.attributes.url}`}
          alt={`${attributes.image.data.attributes.name}`}
        />
        <div>
          <h3>{attributes.role}</h3>
          <p>{attributes.name}</p>
        </div>
      </Card>
    ))}
  </>
);

// const members = [
//   {
//    name : "Jerry Wen",
//    role : "President"
//   },
//   {
//     name : "Lam Phong Nguyen Dang",
//     role : "Vice-President"
//   },
//   {
//     name : "Valerie Ooi",
//     role : "Treasurer"
//   },
//   {
//     name : "Hans Tan",
//     role : "Secretary"
//   },
//   {
//     name : "Annie Kemp",
//     role : "Outreach Officer"
//   },
//   {
//     name : "Walter Kwong",
//     role : "Equality Officer"
//   },
//   {
//     name : "Artin Tan",
//     role : "Workshop Creator"
//   },
//   {
//     name : "Lumi Long",
//     role : "Lumi Long"
//   }
// ]

const fetchInfo = async () => {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    next: { revalidate: 3600 },
  };
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/members?populate=*`,
    reqOptions
  );

  const res = await req.json();
  return res.data;
};

function Members() {
  const ref = useRef();
  const x = useMotionValue(0);
  const [width, setWidth] = useState(0);
  const [members, setMembers] = useState([]);
  const { ref : viewRef, inView, _ } = useInView({
    threshold: 1,
    triggerOnce: true
  });


  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      viewRef(node);
    },
    [viewRef],
  );


  useEffect(() => {
    setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
    fetchInfo().then((data) => setMembers(data));
  }, [inView, ref]);

  return (
    <Section>
      <h2>WE ARE</h2>
      <Container ref={setRefs} style={{ x }}>
        <InnerContainer
          ref={viewRef}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          drag="x"
          dragConstraints={{
            right: 0,
            left: -width,
          }}
          transition={{
            type: "spring",
            duration: 1,
          }}
        >
          {inView && <Cards members={members} />}
        </InnerContainer>
      </Container>
    </Section>
  );
}

export default Members;
