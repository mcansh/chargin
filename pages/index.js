import React from 'react';
import Battery from '../components/Battery';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      batterySentence: '',
      sentence: '',
      batteryLevel: '',
      color: '',
      charging: false,
    };
  }

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
    const getTime = (time) => {
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
          batteryLevel,
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
    return (
      <div>
        <h3>{this.state.sentence}</h3>
        <h1>{this.state.batterySentence}</h1>
        <Battery percent={this.state.batteryLevel} color={this.state.color} />
        <style jsx>{`
          h1 {
            margin: 0.67em 0;
          }
          @media (max-width: 650px) {
            h1 {
              font-size: 2rem;
            }
            h3 {
              font-size: 1.3rem;
            }
          }
        `}</style>
        <style jsx global>{`
          @import url('https://mcan.sh/assets/fonts/Gotham/gotham.css');
          * {
            margin: 0;
            box-sizing: border-box;
            font-weight: 300;
          }
          body {
            background: #222;
            color: white;
            min-height: 100vh;
            font-family: 'Gotham Pro';
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            text-align: center;
            max-width: 800px;
            width: 90%;
            margin: 0 auto;
            line-height: 1.2;
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
