vehicleSpeedGaugeNeedle = null;
vehicleRPMGaugeNeedle = null;

function updateGauges(speed, RPM) {
    var degrees = (speed / 150) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    var degrees = (RPM / 7000) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;
}

function setUpGauges(inputSpeedNeedle, inputRPMNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
}