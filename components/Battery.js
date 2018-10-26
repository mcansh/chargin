// @flow
import React from 'react';
import styled from 'styled-components';
import Bolt from './Bolt';

const BatteryStyles = styled.div`
  width: 350px;
  border: 10px solid white;
  background: inherit;
  height: 150px;
  position: relative;
  display: flex;
  border-radius: 22px;
  z-index: 2;
  margin: 0 auto;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -1.5rem;
    right: -2rem;
    height: 3rem;
    width: 1.5rem;
    background: white;
    border: 2px solid white;
    border-radius: 0 10px 10px 0;
    z-index: -1;
  }

  #battery__fill {
    background: ${props => props.color};
    flex-basis: ${props => props.percent}%;
  }
`;

type Props = {
  percent: number,
  color: string,
  charging: boolean,
};

const Battery = ({ percent, color, charging }: Props) => {
  if (!percent && !color) return null;
  return (
    <BatteryStyles color={color} percent={percent}>
      <div id="battery__fill">{charging && <Bolt />}</div>
    </BatteryStyles>
  );
};

export default Battery;
