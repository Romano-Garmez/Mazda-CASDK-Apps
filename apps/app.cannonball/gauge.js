vehicleSpeedGaugeNeedle = null;
vehicleRPMGaugeNeedle = null;
fuelLevelGaugeNeedle = null;
coolantTempGaugeNeedle = null;
intakeTempGaugeNeedle = null;
const maxSpeed = 150;
const maxRPM = 8000;
const fullFuel = 184;
var fuelLevels = [];


function updateGauges(speed, RPM, fuel, coolantTemp, intakeTemp) {
    var degrees = (speed / maxSpeed) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (RPM / maxRPM) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (calculateFuelAverage() / fullFuel) * 180 - 90;
    fuelLevelGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = fuel;

    coolantTemp = calculateTemp(coolantTemp);
    degrees = (scaleValue(coolantTemp, 100, 190, 280));
    coolantTempGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = coolant temp;

    intakeTemp = calculateTemp(intakeTemp);
    degrees = (scaleValue(intakeTemp, 50, 90, 120));
    intakeTempGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = intake temp;
}

function setUpGauges(inputSpeedNeedle, inputRPMNeedle, inputFuelNeedle, inputCoolantTempNeedle, inputIntakeTempNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
    fuelLevelGaugeNeedle = inputFuelNeedle;
    coolantTempGaugeNeedle = inputCoolantTempNeedle;
    intakeTempGaugeNeedle = inputIntakeTempNeedle;
}

function calculateFuelLevel(fuel) {
    //console.log("fuel = " + fuel);
    // Add the new fuel level to the array
    if (!isNaN(fuel)) {
        fuelLevels.push(fuel);
    }

    // If the array exceeds 30 elements, remove the oldest element
    if (fuelLevels.length > 30) {
        fuelLevels.shift();
    }

    var fuelAvg = calculateFuelAverage();

    var percentage = (fuelAvg / fullFuel) * 100;
    percentage = Math.round(percentage);
    return percentage + '%';
}

function calculateFuelAverage() {
    var sum = 0;

    for (var i = 0; i < fuelLevels.length; i++) {
        sum += fuelLevels[i];
    }

    var average = sum / fuelLevels.length;

    //console.log("fuel avg = " + fuelLevels + "for an avg of = " + average);

    return Math.round(average);
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

function calculateTemp(inputTemp) {
    var inputTempC = inputTemp -= 40;

    var inputTempF = Math.round(inputTempC * 1.8 + 32);

    return inputTempF;
}