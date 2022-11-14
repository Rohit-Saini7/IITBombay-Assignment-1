import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from './firebase';

const SignInModal = ({ setUser, setShowModal }) => {
  const [message, setMessage] = useState('');

  const handleGoogleClick = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setShowModal(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        setMessage(errorMessage);
        console.error(errorCode, errorMessage, email);
      });
  };

  const handleGitHubClick = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
        setShowModal(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        setMessage(errorMessage);
        console.error(errorCode, errorMessage, email);
      });
  };

  return (
    <Container>
      <InnerContainer>
        <ModalHeading>Log In</ModalHeading>
        <ButtonsWrapper>
          <StyledButton onClick={handleGoogleClick}>
            <img src='assets/google.svg' alt='' /> Google
          </StyledButton>
          <StyledButton onClick={handleGitHubClick}>
            <img src='assets/github.svg' alt='' />
            Github
          </StyledButton>
        </ButtonsWrapper>
        {message}
      </InnerContainer>
    </Container>
  );
};

export default SignInModal;

const Container = styled.div`
  position: absolute;
  top: -46%;
  left: -12.5%;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  color: #fff;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  height: 20vh;
  width: 20vw;
  background-color: white;
  border-radius: 10px;
  color: black;
  text-align: center;
  padding: 30px;
`;

const ModalHeading = styled.h1`
  margin-bottom: 20px;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  outline: none;
  border: 1px solid #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 10px;
  border-radius: 100px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  min-width: 110px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    translate: 0 -2px;
  }

  &:active {
    translate: 0 5px;
  }

  & > img {
    height: 24px;
  }
`;
