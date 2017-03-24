import { $ } from './bling';

if (navigator.getBattery !== undefined) {
  navigator.getBattery()
    .then((battery) => {
      function updateChargeInfo() {
        const batteryLevel = battery.level * 100;
        if (batteryLevel === 100) {
          $('.charge-fill').style.background = 'limegreen';
        } else if (batteryLevel >= 20 && batteryLevel <= 80) {
          $('.charge-fill').style.background = '#ffc600';
        } else {
          $('.charge-fill').style.background = '#E53A40';
        }
        $('.charge-fill').style.flexBasis = `${batteryLevel}%`;

        if (battery.charging === true) {
          $('.charge-fill').classList.add('charging');
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
  $('body').remove();
  const unsupported = document.createElement('body');
  const unsupportedText = document.createTextNode('navigator.getBattery is not supported in your browser 😞');
  unsupported.appendChild(unsupportedText);
  const head = $('head');
  $('html').insertBefore(unsupported, head);
}
