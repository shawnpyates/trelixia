import styled from 'styled-components';
import { Composition } from 'atomic-layout';

export const GameContainer = styled.div`
  height: 500px;

  position: absolute;
  top: 100px;
  left: 350px;
  @media only screen and (max-width: 1040px) {
    left: 10%;
  }
`;

export const Title = styled.h1`
  font-family: Pathway Gothic One;
  display: inline-block;
`;

export const Detail = styled.p`
  font-size: 18px;
`;

export const Bookmark = styled.div`
  display: inline;
  font-size: 18px;
  position: absolute;
  top: 25px;
  right: 25%;
  text-transform: uppercase;
  cursor: pointer;
`;

export const BookmarkText = styled.p`
  margin-right: 10px;
  display: inline;
`;

export const StyledComposition = styled(Composition)`
  position: absolute;
  top: 15%;
`;
