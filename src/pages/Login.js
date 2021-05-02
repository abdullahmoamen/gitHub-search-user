import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
import { motion } from 'framer-motion';

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
  const buttonVariants = {
    hover: {
    scale: 1.2,
    color: '#000',
    transition: {
        duration: 0.3,
        yoyo: 10
    }
    }
}

const titleVariants = {
  hidden: { 
      opacity: 0, 
      x: '80vw' 
  },
  visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', delay: 0.5 }
  },
  exit: {
      x: "-80vh",
      transition: { ease: 'easeInOut' }
  }
  };

const Login = () => {
  const {loginWithRedirect}=useAuth0();
  return (
    <Wrapper>
      <motion.div className="container"
          variants={divVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
      >
        <img src={loginImg} alt="GitHub User"/>
        <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >GitHub Login User</motion.h1>
        <motion.button 
        variants={buttonVariants}
        whileHover="hover"
        className="btn" onClick={loginWithRedirect}>Login / Sign Up</motion.button>
      </motion.div>
    </Wrapper>
  )
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
