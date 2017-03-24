import { $ } from './bling';

if (navigator.getBattery) {
  navigator.getBattery()
    .then((battery) => {
      function updateChargeInfo() {
        const batteryLevel = battery.level * 100;
        const timeUntilZero = (battery.dischargingTime / 3600).toFixed(2);
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
          const timeDiv = document.createElement('h3');
          const timeContent = document.createTextNode(`Roughly ${timeUntilZero} hours until ☠️`);
          timeDiv.appendChild(timeContent);
          const currentNode = $('h1');
          document.body.insertBefore(timeDiv, currentNode);
        } else {
          $('h1').textContent = `${batteryLevel}% battery power and climbing!`;
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
