import React from 'react';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    const hourStr = hours > 1 ? 'hours' : 'hour';
    const minuteStr = hours > 1 ? 'minutes' : 'minute';

    return `${hours} ${hourStr} ${minutes} ${minuteStr}`;
  }

  async componentDidMount() {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();

      const updateBatteryInfo = () => {
        const batteryLevel = Math.round(battery.level * 100);
        console.log(battery);

        const status = battery.charging ? 'climbing' : 'dropping';
        const batterySentence = `${batteryLevel}% battery power and ${status}!`;

        const chargeTime = this.getTime(battery.chargingTime);
        const dischargeTime = this.getTime(battery.dischargingTime);

        console.log(chargeTime, dischargeTime);
        let sentence;
        if (battery.chargingTime !== Infinity) {
          sentence = `Roughly ${chargeTime} until 💯`;
        } else if (battery.dischargingTime !== Infinity) {
          sentence = `Roughly ${dischargeTime} until ☠️`;
        } else if (batteryLevel === 100) {
          sentence = 'Charged Up - Drake';
        }

        this.setState({ batterySentence, sentence });
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
      </div>
    );
  }
}

export default Index;
