import React from 'react';
import styled from 'styled-components';

import { TimeIndicator } from './components/TimeIndicator';

const Page = styled.div`
  background-image: ${props => props.image ? 'url(data:image/png;base64,' + props.image + ')' : 'linear-gradient(to bottom right, #ff0070, #ff0070, black)'};
  background-color: #111;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 800px;
  background-blend-mode: overlay;
  height: 480px;
  width: 800px;
  padding: 30px;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Image = styled.img`
  z-index: 9;
  opacity: ${props => props.hide ? 0 : 1};
  height: 100%;
`;

const TextContainer = styled.div`
  z-index: 1000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Title = styled.div`
  font-family: "Montserrat", "Open Sans", Helvetica, sans-serif;
  font-weight: 400;
  font-size: 56px;
  color: #fff;
`;

const Artist = styled.div`
  font-family: "Montserrat", "Open Sans", Helvetica, sans-serif;
  font-weight: 200;
  font-size: 48px;
  color: #fff;
  margin-top: 12px;
`;

export const Debug = styled(Artist)`
  font-size: 24px;
`;

const HorizontalBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  flex: 1;
  padding: 30px;
`;

export const Display = ({id, title, album, progress, artist, playing, image, volume}) => (
  <Page image={image}>
    <TextContainer>
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
    </TextContainer>
    <HorizontalBox>
      <ImageContainer>
        <Image hide={!image} src={`data:image/png;base64,${image}`} />
      </ImageContainer>
      <TextContainer>
        <TimeIndicator id={id} progress={progress} runTimer={playing} />
        {/* <Debug>{playing ? 'Playing' : 'Stopped'}</Debug> */}
        {/* <Debug>Volume: {volume}%</Debug> */}
      </TextContainer>
    </HorizontalBox>

  </Page>
);
