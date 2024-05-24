var startTime = 0;

function startTimer () {
    console.log("Timer started");
    startTime = new Date().getTime();
}

function stopTimer () {
    console.log("Timer ended");
    var endTime = new Date().getTime();

    var timeDiff = endTime - startTime; //in ms

    startTime = 0;
    return timeDiff;
}

function isTimerRunning () {
    return startTime > 0;
}