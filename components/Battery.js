import React from 'react';
import PropTypes from 'prop-types';
import Bolt from './Bolt';

const Battery = ({ percent, color, charging }) => {
  if (!percent && !color) return null;
  const showBolt = () => (charging ? <Bolt /> : null);
  return (
    <div id="battery">
      <div id="battery__fill">{showBolt()}</div>
      <style jsx>{`
        #battery {
          width: 350px;
          border: 10px solid white;
          background: inherit;
          height: 150px;
          position: relative;
          display: flex;
          border-radius: 22px;
          z-index: 2;
          margin: 0 auto;
        }
        #battery::after {
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
          background: ${color};
          flex-basis: ${percent};
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }
      `}</style>
    </div>
  );
};

Battery.propTypes = {
  color: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
  charging: PropTypes.bool.isRequired,
};

export default Battery;
