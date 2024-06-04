startTime = -1;
endTime = -1;
swhtmlElement = null;

function startStopwatch(inputHTMLElement) {
    swhtmlElement = inputHTMLElement;
    startTime = new Date().getTime();

    const swinterval = setInterval(function() {
        showStopwatchTime()
      }, 1000);
}

function stopStopwatch() {
    if (startTime > 0) {
        endTime = new Date().getTime();
        startTime = -1;
        return endTime - startTime;
    }
    return -1;
}

function showStopwatchTime() {
    if (startTime > 0) {
        duration = (new Date().getTime() - startTime);
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        swhtmlElement.html(hours + ":" + minutes + ":" + seconds);
    }
    return -1;
}

function resetStopwatch() {
    startTime = -1;
    endTime = -1;
    swhtmlElement.html("00:00:00");
}