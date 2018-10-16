import React from 'react';
import dynamic from 'next/dynamic';
import Battery from '../components/Battery';

const Heading = dynamic(import('../components/Heading'));
const SubHeading = dynamic(import('../components/SubHeading'));

class Index extends React.Component {
  state = {
    batterySentence: '',
    sentence: '',
    batteryLevel: '',
    color: '',
    charging: false,
  };

  componentDidMount() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(console.log('service worker registration successful'))
        .catch(err => console.warn(err));
    }
    this.updateBatteryInfo();
  }

  async updateBatteryInfo() {
    const getTime = time => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);

      const hourStr = hours === 1 ? 'hour' : 'hours';
      const minuteStr = hours === 1 ? 'minute' : 'minutes';

      if (hours > 0) {
        return `${hours} ${hourStr} ${minutes} ${minuteStr}`;
      }

      return `${minutes} ${minuteStr}`;
    };

    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();

      const updateBatteryInfo = () => {
        const batteryLevel = Math.round(battery.level * 100);
        console.log(battery);

        const status = battery.charging ? 'climbing' : 'dropping';
        const batterySentence =
          battery.charging && batteryLevel === 100
            ? `${batteryLevel}% battery power`
            : `${batteryLevel}% battery power and ${status}!`;

        const chargeTime = getTime(battery.chargingTime);
        const dischargeTime = getTime(battery.dischargingTime);

        let sentence;
        if (battery.charging && batteryLevel === 100) {
          sentence = 'Charged Up - Drake';
        } else if (battery.charging && battery.chargingTime !== Infinity) {
          sentence = `Roughly ${chargeTime} until 💯`;
        } else if (battery.dischargingTime !== Infinity) {
          sentence = `Roughly ${dischargeTime} until ☠️`;
        }

        const color = batteryLevel > 20 ? 'limegreen' : '#E53A40';

        this.setState({
          batterySentence,
          sentence,
          batteryLevel: `${batteryLevel}%`,
          color,
          charging: battery.charging,
        });
      };

      updateBatteryInfo();
      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingtimechange', updateBatteryInfo);
      battery.addEventListener('dischargingtimechange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);
    } else {
      this.setState({
        sentence: 'navigator.getBattery is not supported in your browser 😞',
      });
    }
  }

  render() {
    const {
      sentence,
      batterySentence,
      charging,
      batteryLevel,
      color,
    } = this.state;
    return (
      <div>
        {sentence && <SubHeading>{sentence}</SubHeading>}
        {batterySentence && <Heading>{batterySentence}</Heading>}
        <Battery charging={charging} percent={batteryLevel} color={color} />
      </div>
    );
  }
}

export default Index;
