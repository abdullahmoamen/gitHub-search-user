import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

const divVariants = {
  hidden: { 
      opacity: 0, 
      y: '50vh' 
  },
  visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', delay: 0.5 }
  },
  exit: {
      y: "-50vw",
      transition: { ease: 'easeInOut' }
  }
  };

  

const Error = () => {
  return <Wrapper>
    <motion.div
      variants={divVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      >
      <h1>4<span>🤥</span>4</h1>
      <br/>
      <h3>Sorry, This Page cannot be found</h3>
      <Link to='/' className='btn'>
        Return home
      </Link>
    </motion.div>
  </Wrapper>;
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-grey-9);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
