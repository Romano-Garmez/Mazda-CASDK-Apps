vehicleSpeedGaugeNeedle = null;
vehicleRPMGaugeNeedle = null;
fuelLevelGaugeNeedle = null;

function updateGauges(speed, RPM, fuel) {
    var degrees = (speed / 150) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (RPM / 7000) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (fuel / 185) * 180 - 90;
    fuelLevelGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;
}

function setUpGauges(inputSpeedNeedle, inputRPMNeedle, inputFuelNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
    fuelLevelGaugeNeedle = inputFuelNeedle;
}