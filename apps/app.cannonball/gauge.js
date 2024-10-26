vehicleSpeedGaugeNeedle = null;

function updateGauges(speed) {
    var degrees = (speed / 150) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;
}

function setUpGauges(inputHTMLElement) {
    vehicleSpeedGaugeNeedle = inputHTMLElement;
}