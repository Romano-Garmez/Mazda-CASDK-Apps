startTime = -1;
endTime = -1;

function startStopwatch() {
    startTime = new Date().getTime();
}

function stopStopwatch() {
    if (startTime > 0) {
        endTime = new Date().getTime();
        startTime = -1;
        return endTime - startTime;
    }
    return -1;
}