import React from 'react';
import styled from 'styled-components';

const BoltStyles = styled.svg`
  fill: #ffb600;
  height: 100px;
  width: 56px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
`;

const Bolt = () => (
  <BoltStyles
    id="charge"
    xmlns="http://www.w3.org/2000/svg"
    width={57}
    height={100}
    viewBox="0 0 57 100"
  >
    <path d="M11.4566406,99.4832031 C11.5816406,99.0480469 15.0074219,86.4099609 19.0693359,71.3984375 C23.1310547,56.3869141 26.5402344,43.7933594 26.6453125,43.4126953 C26.7501953,43.0318359 26.6818359,42.7220703 26.4933594,42.7242187 C26.3048828,42.7261719 20.2769531,43.7746094 13.0980469,45.0537109 C5.91914062,46.3328125 0.025,47.3544922 0.0001953125,47.3244141 C-0.0349609375,47.2814453 7.9578125,17.2244141 11.9273437,2.47226562 L12.5925781,0 L37.7568359,0 L33.0480469,14.1150391 C30.4582031,21.8783203 28.4009766,28.2916016 28.4761719,28.3669922 C28.5515625,28.4421875 34.8757812,27.4578125 42.5298828,26.1794922 C52.7369141,24.4748047 56.3931641,23.9949219 56.2457031,24.3789063 C55.9476562,25.1558594 12.0357422,99.4166016 11.6011719,99.8787109 C11.3644531,100.130469 11.3121094,99.9865234 11.4566406,99.4832031 L11.4566406,99.4832031 Z" />
  </BoltStyles>
);

export default Bolt;
