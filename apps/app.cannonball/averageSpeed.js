avgSpeed = -1;
totalSpeed = 0;
numOfSpeedData = 0;

function updateAverageSpeed(currentSpeed){
    if(avgSpeed == -1){
        avgSpeed = currentSpeed;
        numOfSpeedData = 1;
    } else {
        totalSpeed += currentSpeed;
        avgSpeed = totalSpeed / numOfSpeedData;
        numOfSpeedData++;
    }
return avgSpeed;
}

function getAverageSpeed(){
    return avgSpeed;
}

function resetAverageSpeed(){
    avgSpeed = -1;
    totalSpeed = 0;
    numOfSpeedData = 0;
}