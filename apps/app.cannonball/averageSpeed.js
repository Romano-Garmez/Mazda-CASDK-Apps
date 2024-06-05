avgSpeed = -1;
totalSpeed = 0;
numOfSpeedData = 0;
currentSpeed = -1;
htmlElement = null;
running = false;

/* updateAverageSpeed
 * Update the average speed with the current speed on HTML element
 */
function updateAverageSpeed(){
    if(avgSpeed == -1){
        avgSpeed = currentSpeed;
        numOfSpeedData = 1;
    } else {
        totalSpeed += currentSpeed;
        avgSpeed = totalSpeed / numOfSpeedData;
        numOfSpeedData++;
    }
htmlElement.html(Math.round(avgSpeed * 100) / 100);

return avgSpeed;
}

/* setCurrentSpeed
 * Set the current speed to be used in the average speed calculation. Used to get speed from app.js
 * inputCurrentSpeed: the current speed
 */
function setCurrentSpeed(inputCurrentSpeed){
    currentSpeed = inputCurrentSpeed;
}

/* startAvgSpeed
 * Start the average speed calculation with an interval of 1 second
 * inputHTMLElement: the HTML element to display the average speed
 */
function startAvgSpeed(inputHTMLElement){
    running = true;
    htmlElement = inputHTMLElement;
    const interval = setInterval(function() {
        updateAverageSpeed()
      }, 1000);
}

/* pauseCurrentSpeed
 * Pause the average speed calculation interval
 */
function pauseCurrentSpeed(){
    running = false;
    clearInterval(interval);
}

/* resumeCurrentSpeed
 * Resume the average speed calculation interval
 */
function resumeCurrentSpeed(){
    running = true;
    startAvgSpeed(htmlElement);
}

/* resetAverageSpeed
 * Reset the average speed calculation and all data
 */
function resetAverageSpeed(){
    avgSpeed = -1;
    totalSpeed = 0;
    numOfSpeedData = 0;
    clearInterval(interval);

    htmlElement.html("0");

    startAvgSpeed(htmlElement);
}