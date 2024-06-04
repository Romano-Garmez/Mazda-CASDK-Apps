avgSpeed = -1;
totalSpeed = 0;
numOfSpeedData = 0;
currentSpeed = -1;
htmlElement = null;

function updateAverageSpeed(){
    if(avgSpeed == -1){
        avgSpeed = currentSpeed;
        numOfSpeedData = 1;
    } else {
        totalSpeed += currentSpeed;
        avgSpeed = totalSpeed / numOfSpeedData;
        numOfSpeedData++;
    }
htmlElement.html(Math.round(getAverageSpeed() * 100) / 100);

return avgSpeed;
}

function setCurrentSpeed(inputCurrentSpeed){
    currentSpeed = inputCurrentSpeed;
}

function startAvgSpeed(inputHTMLElement){
    htmlElement = inputHTMLElement;
    const interval = setInterval(function() {
        updateAverageSpeed()
      }, 1000);

     
     //clearInterval(interval); // thanks @Luca D'Amico
}

function getAverageSpeed(){
    return avgSpeed;
}

function resetAverageSpeed(){
    avgSpeed = -1;
    totalSpeed = 0;
    numOfSpeedData = 0;
    clearInterval(interval);

    htmlElement.html("0");

    startAvgSpeed(htmlElement);
}