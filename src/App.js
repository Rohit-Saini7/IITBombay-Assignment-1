import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

function App() {
  const [mediaType, setMediaType] = useState('');
  const [videoFile, setVideoFile] = useState({});
  const [audioFile, setAudioFile] = useState({});
  const handleMediaChange = (e) => {
    const mediaFileType = e.target.files[0].type.slice(0, 5);
    setMediaType(mediaFileType);
    let mediaURL = URL.createObjectURL(e.target.files[0]);
    let source = document.getElementById(`${mediaFileType}_here`);
    source.src = mediaURL;
    source.parentElement.load();
    mediaFileType === 'video'
      ? setVideoFile(e.target.files[0])
      : setAudioFile(e.target.files[0]);
  };
  return (
    <React.Fragment>
      <Navbar
        mediaType={mediaType}
        videoFile={videoFile}
        audioFile={audioFile}
      />
      <Container>
        <LeftSection>
          <input
            type='file'
            id='mediaFile'
            accept='video/*, audio/*'
            onChange={handleMediaChange}
            hidden
          />
          <video
            height='400'
            style={{ display: `${mediaType === 'video' ? 'block' : 'none'}` }}
            controls
          >
            <source src='assets/video1.mp4' id='video_here' />
          </video>
          <audio
            style={{ display: `${mediaType === 'audio' ? 'block' : 'none'}` }}
            controls
          >
            <source src='assets/audio1.mp3' id='audio_here' />
          </audio>
          <StyledButton
            htmlFor='mediaFile'
            style={{
              display: `${
                !(mediaType === 'video')
                  ? !(mediaType === 'audio')
                    ? 'block'
                    : 'none'
                  : 'none'
              }`,
            }}
          >
            Add Media
          </StyledButton>
        </LeftSection>
        <RightSection>
          <TextSection
            id='textFromHere'
            placeholder='Write text here...'
          ></TextSection>
        </RightSection>
      </Container>
    </React.Fragment>
  );
}

export default App;

const Container = styled.div`
  margin: 20px;
  margin-top: 10vh;
  display: grid;
  gap: 2vw;
  text-align: center;

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftSection = styled.section`
  min-height: 10vh;
  max-width: 80vw;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, 0.5),
    0 1.25em 5em 1em rgba(0, 0, 0, 0.2);
  & > video {
    max-width: 95%;
  }
  & > audio {
    max-width: 95%;
  }
  @media screen and (min-width: 1000px) {
    height: 70vh;
    width: 39vw;
  }
`;

const RightSection = styled.section`
  min-height: 10vh;
  max-width: 80vw;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, 0.5),
    0 1.25em 5em 1em rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 1000px) {
    height: 70vh;
    width: 39vw;
  }
`;

const StyledButton = styled.label`
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

  &:hover {
    translate: 0 -2px;
    background-color: #7053bc;
  }

  &:active {
    translate: 0 5px;
  }
`;

const TextSection = styled.textarea`
  min-height: 10vh;
  width: 35vw;
  cursor: text;
  color: white;
  outline: none;
  font-size: 1.1em;
  text-align: left;
  resize: none;
  padding: 10px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;

  &:hover {
    border: 1px solid white;
  }
  @media screen and (min-width: 1000px) {
    height: 62vh;
  }
`;
