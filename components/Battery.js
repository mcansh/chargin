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
          height: 150px;
          position: relative;
          display: flex;
          border-radius: 12px;
          z-index: 2;
          margin: 0 auto;
        }
        #battery__fill {
          flex: 0;
          flex-basis: 0%;
          background: ${color};
          flex-basis: ${percent}%;
        }
      `}</style>
    </div>
  );
};

Battery.propTypes = {
  color: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  charging: PropTypes.bool.isRequired,
};

export default Battery;
