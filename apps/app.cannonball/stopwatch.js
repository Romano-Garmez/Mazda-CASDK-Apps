startTime = -1;
endTime = -1;
swhtmlElement = null;
swinterval = null;
timeOfReset = 0;
resetTime = -1;
resetEndTime = -1;

/* startStopwatch
 * Start the stopwatch with an interval of 1 second
 * inputHTMLElement: the HTML element to display the stopwatch
 */
function startStopwatch(inputHTMLElement) {
    swhtmlElement = inputHTMLElement;
    startTime = new Date().getTime();

    swinterval = setInterval(function () {
        showStopwatchTime()
    }, 1000);
}

/* startStopwatchNoReset
    * Start the stopwatch with an interval of 1 second without resetting the time
    * inputHTMLElement: the HTML element to display the stopwatch
    */
function startStopwatchNoReset(inputHTMLElement) {
    swhtmlElement = inputHTMLElement;

    swinterval = setInterval(function () {
        showStopwatchTime()
    }, 1000);
}

/* stopStopwatch
 * Stop the stopwatch and return the time in milliseconds
 */
function stopStopwatch() {
    if (startTime > 0) {
        endTime = new Date().getTime();
        startTime = -1;
        return endTime - startTime;
    }
    return -1;
}

/* showStopwatchTime
 * Show the time on the HTML element
 */
function showStopwatchTime() {
    if (startTime > 0) {
        duration = (new Date().getTime() - startTime - timeOfReset);
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

/* pauseStopwatch
 * Pause the stopwatch interval
 */
function pauseStopwatch() {
    resetTime = new Date().getTime();
    clearInterval(swinterval);
}

/* resumeStopwatch
 * Resume the stopwatch interval
 */
function resumeStopwatch() {
    resetEndTime = new Date().getTime();
    timeOfReset = Math.floor((resetEndTime - resetTime));
    startStopwatchNoReset(swhtmlElement);
}

/* resetStopwatch
 * Reset the stopwatch and all data
 */
function resetStopwatch() {
    startTime = -1;
    endTime = -1;
    clearInterval(swinterval);

    swhtmlElement.html("00:00:00");

    startStopwatch(swhtmlElement);
}