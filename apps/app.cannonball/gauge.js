vehicleSpeedGaugeNeedle = null;
vehicleRPMGaugeNeedle = null;
fuelLevelGaugeNeedle = null;
coolantTempGaugeNeedle = null;
const maxSpeed = 150;
const maxRPM = 8000;
const fullFuel = 184;


function updateGauges(speed, RPM, fuel, coolantTemp) {
    var degrees = (speed / maxSpeed) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (RPM / maxRPM) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (fuel / fullFuel) * 180 - 90;
    fuelLevelGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = fuel;

    console.log("coolant temp is " + coolantTemp);
    console.log(scaleValue(coolantTemp, 100, 190, 280));
    degrees = (scaleValue(coolantTemp, 100, 190, 280));
    coolantTempGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = coolant temp;
}

function setUpGauges(inputSpeedNeedle, inputRPMNeedle, inputFuelNeedle, inputCoolantTempNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
    fuelLevelGaugeNeedle = inputFuelNeedle;
    coolantTempGaugeNeedle = inputCoolantTempNeedle;
}

function calculateFuelLevel(fuel) {
    var percentage = (fuel / fullFuel) * 100;
    percentage = Math.round(percentage);
    return percentage + '%';
}

function scaleValue(value, min, middle, max) {
    if (value < min) {
        return -90;
    } else if (value > max) {
        return 90;
    }
    // If temperature is below normal (100-190)
    else if (value <= middle) {
        // Map 100-190 to -90-0 degrees
        return -90 + ((value - min) / (middle - min)) * 90;
    }
    // If temperature is above normal (190-280)
    else {
        // Map 190-280 to 0-90 degrees
        return ((value - middle) / (max - middle)) * 90;
    }
}