// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import IntlRelativeFormat from 'intl-relativeformat';
import Battery from '../components/Battery';

const Heading = dynamic(import('../components/Heading'), {
  loading: () => null,
});

const SubHeading = dynamic(import('../components/SubHeading'), {
  loading: () => null,
});

const Index = () => {
  // $FlowFixMe
  const [batteryState, setBattery] = React.useState({
    charging: false,
    charge: 0,
    chargingTime: 0,
    dischargingTime: 0,
    color: '',
  });

  // $FlowFixMe
  const [{ heading, subheading }, setText] = React.useState({
    heading: '',
    subheading: '',
  });

  const getTime = (seconds: number): string => {
    const date = new Date(Date.now() + seconds * 1000);
    const rf = new IntlRelativeFormat('en-US');

    return rf.format(date);
  };

  const updateBatteryInfo = async () => {
    const battery = await window.navigator.getBattery();
    const { charging, level } = battery;
    const charge = level * 100;
    const chargingTime =
      battery.chargingTime === Infinity ? null : getTime(battery.chargingTime);
    const dischargingTime =
      battery.dischargingTime === Infinity
        ? null
        : getTime(battery.dischargingTime);

    const color = charge > 20 ? '#1EB273' : '#E53A40';

    setBattery({
      ...batteryState,
      charging,
      color,
      charge,
      chargingTime,
      dischargingTime,
    });
    return battery;
  };

  const updateText = () => {
    if (batteryState.charging && batteryState.charge === 100) {
      return setText({
        subheading: 'Charged Up - Drake',
        heading: `${batteryState.charge}% battery power`,
      });
    }
    if (batteryState.charging && batteryState.chargingTime) {
      return setText({
        subheading: `💯💯 Fully charged roughly ${
          batteryState.chargingTime
        } 💯💯`,
        heading: `${batteryState.charge}% battery power and ${
          batteryState.charging ? 'climbing' : 'dropping'
        }!`,
      });
    }
    if (batteryState.dischargingTime) {
      return setText({
        subheading: `💀💀 Dead roughly ${batteryState.dischargingTime} 💀💀`,
        heading: `${batteryState.charge}% battery power and ${
          batteryState.charging ? 'climbing' : 'dropping'
        }!`,
      });
    }

    return setText({
      heading: `${batteryState.charge}% battery power!`,
    });
  };

  // $FlowFixMe
  React.useEffect(() => {
    updateText();
  });

  // $FlowFixMe
  React.useEffect(
    async () => {
      const battery = await updateBatteryInfo();
      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingtimechange', updateBatteryInfo);
      battery.addEventListener('dischargingtimechange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);
      return () => {
        battery.removeEventListener('levelchange', updateBatteryInfo);
        battery.removeEventListener('chargingtimechange', updateBatteryInfo);
        battery.removeEventListener('dischargingtimechange', updateBatteryInfo);
        battery.removeEventListener('chargingchange', updateBatteryInfo);
      };
    },
    [
      batteryState.chargingTime,
      batteryState.charging,
      batteryState.dischargingTime,
    ]
  );

  return (
    <>
      {subheading && <SubHeading>{subheading}</SubHeading>}
      {heading && <Heading>{heading}</Heading>}
      <Battery
        charging={batteryState.charging}
        color={batteryState.color}
        percent={batteryState.charge}
      />
    </>
  );
};

export default Index;
