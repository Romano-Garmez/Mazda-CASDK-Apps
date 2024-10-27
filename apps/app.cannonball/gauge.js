vehicleSpeedGaugeNeedle = null;
vehicleRPMGaugeNeedle = null;
fuelLevelGaugeNeedle = null;
const fullFuel = 184;

function updateGauges(speed, RPM, fuel) {
    var degrees = (speed / 150) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (RPM / 8000) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (fuel / 184) * 180 - 90;
    fuelLevelGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;
}

function setUpGauges(inputSpeedNeedle, inputRPMNeedle, inputFuelNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
    fuelLevelGaugeNeedle = inputFuelNeedle;
}

function calculateFuelLevel(fuel) {
    var percentage = (fuel / fullFuel) * 100;
    percentage = Math.round(percentage);
    return percentage + '%';
}