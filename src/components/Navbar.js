import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import {motion} from 'framer-motion';

const buttonVariants = {
  hover: {
  scale: 1.05,
  transition: {
      duration: 0.3,
      yoyo: 10
  }
  }
}

const nameVariants = {
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

const Navbar = () => {
  const {isAuthenticated,loginWithRedirect,logout,user}=useAuth0();

  const isUser =isAuthenticated && user;

  return (
    <Wrapper>
      {isUser && user.picture && <img  src={user.picture} alt={user.name}/>}
      {isUser && user.name && <motion.h4
      variants={nameVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      >Hey, <strong>{user.name.toUpperCase()}</strong></motion.h4>}
      {isUser ? 
      <motion.button 
      variants={buttonVariants}
      whileHover="hover"
      className='logout' onClick={()=>{logout({returnTo:window.location.origin})}}>
        Logout</motion.button>
      :
      <button onClick={loginWithRedirect}>LOGIN</button>
    }
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: #bdc3c7;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 65px !important;
    height: 65px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .logout{
    background-color:var(--clr-red-dark);
    color:var(--clr-primary-10);
    border-radius: 7px;
    cursor: pointer;
    letter-spacing: var(--spacing);
    padding:8px
  }.logout:hover {
    background-color:var(--clr-primary-5);
    color:white
  }.icon {
      font-size: 1.5rem;
    }
`;

export default Navbar;
