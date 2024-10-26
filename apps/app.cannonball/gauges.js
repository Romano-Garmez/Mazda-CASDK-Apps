var needle = null;
var value = null;

function updateGauge(speed) {
    // Convert speed to degrees (150km/h = 180 degrees)
    var degrees = (speed / 150) * 180 - 90;
    needle.style.transform = 'rotate(' + degrees + 'deg)';
    value.textContent = speed;
  }

  function setGaugeElements(needleElement, valueElement) {
    needle = needleElement;
    value = valueElement;
  }