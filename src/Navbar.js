import React, { useState } from 'react';
import styled from 'styled-components';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import SignInModal from './SignInModal';
import db, { storage } from './firebase';

function Navbar({ mediaType, videoFile, audioFile }) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userAction, setUserAction] = useState('In');

  //TODO: make real call
  const handleSave = async (e) => {
    if (!user) {
      e.target.innerHTML = '-->';

      setTimeout(() => {
        e.target.innerHTML = 'Save';
      }, 3000);
      return;
    } else {
      e.target.innerHTML = '. . .';
      try {
        sendToStorage(e, mediaType, videoFile, audioFile);
      } catch (error) {
        e.target.innerHTML = 'Error';
        console.error('Error adding document: ', error);
      }
    }
  };

  const handleUserLogInOut = () => {
    if (!user) {
      setShowModal(true);
      setUserAction('Out');
      return;
    } else {
      setUser(null);
      setUserAction('In');
    }
  };

  return (
    <Container>
      {showModal && (
        <SignInModal setUser={setUser} setShowModal={setShowModal} />
      )}
      <NavbarWrap className='navbarWrap'>
        <Toolbar>
          <LogoBox>Assignment</LogoBox>
          <div>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <LogInOutButton onClick={handleUserLogInOut}>
              Log {userAction}
            </LogInOutButton>
          </div>
        </Toolbar>
      </NavbarWrap>
    </Container>
  );
}
export default Navbar;

const Container = styled.header`
  width: 80vw;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  position: absolute;
  top: 3%;
  left: 10%;
  border-radius: 10px;
`;

const NavbarWrap = styled.div`
  max-width: 80%;
  margin: auto;
`;
const Toolbar = styled.div`
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LogoBox = styled.div`
  font-size: 2em;
  text-transform: uppercase;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const SaveButton = styled.button`
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  min-width: 110px;
  margin-right: 20px;
  &:hover {
    translate: 0 -2px;
    background-color: #7053bc;
  }
  &:active {
    translate: 0 5px;
  }
`;

const LogInOutButton = styled.button`
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.2s;
  overflow: none;
  position: relative;

  &:hover {
    translate: 0 -2px;
    background-color: #7053bc;
  }
  &:active {
    translate: 0 5px;
  }
`;

const addDocument = async (e, textValue) => {
  const docRef = await addDoc(collection(db, 'entry'), {
    text: textValue,
    timestamp: serverTimestamp(),
  });
  console.log('Document written with ID: ', docRef.id);
  e.target.innerHTML = 'Success';
  setTimeout(() => {
    e.target.innerHTML = 'Save';
  }, 4000);
};

const sendToStorage = (e, mediaType, videoFile, audioFile) => {
  const textValue = document.getElementById('textFromHere').value;

  switch (true) {
    case !!textValue && !mediaType:
      addDocument(e, textValue);
      break;

    case !!textValue && mediaType === 'video':
      {
        const storageRef = ref(storage, 'videos/' + videoFile.name);
        const upload = uploadBytesResumable(storageRef, videoFile);
        upload.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await getDownloadURL(upload.snapshot.ref);
            const docRef = await addDoc(collection(db, 'entry'), {
              text: textValue,
              video: downloadURL,
              timestamp: serverTimestamp(),
            });
            console.log('Document written with ID: ', docRef.id);
            e.target.innerHTML = 'Success';
            setTimeout(() => {
              e.target.innerHTML = 'Save';
            }, 4000);
          }
        );
      }
      break;
    case !!textValue && mediaType === 'audio':
      {
        const storageRef = ref(storage, 'audios/' + audioFile.name);
        const upload = uploadBytesResumable(storageRef, audioFile);
        upload.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await getDownloadURL(upload.snapshot.ref);
            const docRef = await addDoc(collection(db, 'entry'), {
              text: textValue,
              audio: downloadURL,
              timestamp: serverTimestamp(),
            });
            console.log('Document written with ID: ', docRef.id);
            e.target.innerHTML = 'Success';
            setTimeout(() => {
              e.target.innerHTML = 'Save';
            }, 4000);
          }
        );
      }
      break;

    default:
      e.target.innerHTML = 'Error';
      break;
  }
};
