var vehicleSpeedGaugeNeedle = null;
var vehicleRPMGaugeNeedle = null;
var fuelLevelGaugeNeedle = null;
var coolantTempGaugeNeedle = null;
var intakeTempGaugeNeedle = null;
const maxSpeed = 150;
const maxRPM = 8000;
const fullFuel = 184;
var fuelLevels = [];

// update the needles of the gauges on screen
function updateGauges(speed, RPM, fuel, coolantTemp, intakeTemp) {
    // value divided by the max, multiplied by 180 to get the degrees, then -90 to account for the starting position
    var degrees = (speed / maxSpeed) * 180 - 90;
    vehicleSpeedGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    degrees = (RPM / maxRPM) * 180 - 90;
    vehicleRPMGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = speed;

    //doesn't need fuel input as we're now using an avg of the last 30 fuel levels
    degrees = (calculateFuelAverage() / fullFuel) * 180 - 90;
    fuelLevelGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = fuel;

    coolantTemp = calculateTemp(coolantTemp);
    degrees = (scaleValue(coolantTemp, 100, 190, 280));
    coolantTempGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = coolant temp;

    intakeTemp = calculateTemp(intakeTemp);
    degrees = (scaleValue(intakeTemp, 50, 90, 120));
    intakeTempGaugeNeedle.css('transform', 'rotate(' + degrees + 'deg)');        //value.textContent = intake temp;
}

//used to get the html elements for the gauge needles
function setUpGauges(inputSpeedNeedle, inputRPMNeedle, inputFuelNeedle, inputCoolantTempNeedle, inputIntakeTempNeedle) {
    vehicleSpeedGaugeNeedle = inputSpeedNeedle;
    vehicleRPMGaugeNeedle = inputRPMNeedle;
    fuelLevelGaugeNeedle = inputFuelNeedle;
    coolantTempGaugeNeedle = inputCoolantTempNeedle;
    intakeTempGaugeNeedle = inputIntakeTempNeedle;
}

//used to calculate the fuel level based on the last 30 fuel levels
function calculateFuelLevel(fuel) {
    // Add the new fuel level to the array

    // if NaN, hasn't gotten a reading yet. If 0, prob just because default value
    if (!isNaN(fuel) && fuel != 0) {
        fuelLevels.push(fuel);
    }

    // If the array exceeds 30 elements, remove the oldest element
    if (fuelLevels.length > 30) {
        fuelLevels.shift();
    }

    // Calculate the average fuel level to update the gauge
    var fuelAvg = calculateFuelAverage();
    var percentage = (fuelAvg / fullFuel) * 100;
    percentage = Math.round(percentage);
    return percentage + '%';
}

// Calculate the average fuel level over last 30 elements, or less if there aren't 30 yet
function calculateFuelAverage() {
    var sum = 0;

    for (var i = 0; i < fuelLevels.length; i++) {
        sum += fuelLevels[i];
    }

    var average = sum / fuelLevels.length;

    return Math.round(average);
}

// Scale the value to the correct degrees for the gauge
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

// Convert the temperature from Mazda's strange unit to Fahrenheit
function calculateTemp(inputTemp) {
    //Mazda stores the temps as celcius + 40 degress for some reason
    //convert to C
    var inputTempC = inputTemp -= 40;

    //convert to F
    var inputTempF = Math.round(inputTempC * 1.8 + 32);

    return inputTempF;
}