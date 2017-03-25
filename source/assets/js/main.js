import { $ } from './bling';

if ('getBattery' in navigator) {
  navigator.getBattery()
    .then((battery) => {
      function updateChargeInfo() {
        console.log(battery);
        const batteryLevel = battery.level * 100;

        const dischargeHours = Math.floor(battery.dischargingTime / 3600);
        let dischargeMinutes = Math.floor((battery.dischargingTime % 3600) / 60);
        if (dischargeMinutes < 10) {
          dischargeMinutes = `0${dischargeMinutes}`;
        }

        const chargeHours = Math.floor(battery.chargingTime / 3600);
        let chargeMinutes = Math.floor((battery.chargingTime % 3600) / 60);
        if (chargeMinutes < 10) {
          chargeMinutes = `0${chargeMinutes}`;
        }

        const timeUntilZero = `${dischargeHours} hours ${dischargeMinutes} minutes`;
        const timeUntilFull = `${chargeHours} hours ${chargeMinutes} minutes`;
        if (batteryLevel >= 80) {
          $('.charge-fill').style.background = 'limegreen';
        } else if (batteryLevel > 20 && batteryLevel < 80) {
          $('.charge-fill').style.background = '#ffc600';
        } else {
          $('.charge-fill').style.background = '#E53A40';
        }
        $('.charge-fill').style.flexBasis = `${batteryLevel}%`;

        if (battery.charging === true) {
          $('.charge-fill').classList.add('charging');
        }

        if (battery.charging !== true) {
          $('h1').textContent = `${batteryLevel}% battery power and dropping!`;
          if ($('h3')) {
            $('h3').remove();
          }
          if (battery.dischargingTime !== Infinity) {
            const timeDiv = document.createElement('h3');
            const timeContent = document.createTextNode(`Roughly ${timeUntilZero} until ☠️`);
            timeDiv.appendChild(timeContent);
            const currentNode = $('h1');
            document.body.insertBefore(timeDiv, currentNode);
          }
        } else if (battery.charging === true && batteryLevel === 100) {
          $('h1').textContent = `${batteryLevel}% battery power`;
          if ($('h3')) {
            $('h3').remove();
          }
          const timeDiv = document.createElement('h3');
          const timeContent = document.createTextNode('"Charged Up" - Drake');
          timeDiv.appendChild(timeContent);
          const currentNode = $('h1');
          document.body.insertBefore(timeDiv, currentNode);
        } else {
          $('h1').textContent = `${batteryLevel}% battery power and climbing!`;
          if ($('h3')) {
            $('h3').remove();
          }
          if (battery.chargingTime !== Infinity) {
            const timeDiv = document.createElement('h3');
            const timeContent = document.createTextNode(`Roughly ${timeUntilFull} hours until 💯`);
            timeDiv.appendChild(timeContent);
            const currentNode = $('h1');
            document.body.insertBefore(timeDiv, currentNode);
          }
        }
      }

      updateChargeInfo();

      battery.addEventListener('levelchange', updateChargeInfo);
      battery.addEventListener('chargingtimechange', updateChargeInfo);
      battery.addEventListener('dischargingtimechange', updateChargeInfo);
      battery.addEventListener('chargingchange', updateChargeInfo);
    })
    .catch(err => console.log(err));
} else {
  $('body').innerHTML = 'navigator.getBattery is not supported in your browser 😞';
}
