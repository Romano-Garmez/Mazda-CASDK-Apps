//TODO: perhaps comment some of this stuff

function getCoordsInRange(array, gps, specificity) {
    outArray = []
    i = 0
    array.forEach(function (element) {
        if (Math.abs(element.lat - gps.lat) < specificity && Math.abs(element.long - gps.long) < specificity) {
            outArray[i] = element;
            i++;
        }
    })
    return outArray
}

function getNearestCoord(coordSet, gps) {

    isEmpty = true;
    range = .01;

    results = []
    while (isEmpty) {
        results = getCoordsInRange(coordSet, gps, range)
        if (results.length == 0) {
            console.log('getCoordsInRangeGotNoResults')

            range = range * 2
        } else {
            isEmpty = false
        }
    }

    distances = []

    results.forEach(function (element, index) {
        distance =  distanceBetweenCoordsInM(gps, element)
        distances[index] = distance
    })

    idxOfClosest = distances.indexOf(Math.min(...distances))


output = {
    coord: results[idxOfClosest],
    distance: distances[idxOfClosest]
}

    return output
    
}

function coodinateToString(coord) {
    return 'lat: ' + coord.lat + '\nlong: ' + coord.long
}

function distanceBetweenCoordsInM(coord1, coord2) {
    lat1 = coord1.lat
    lat2 = coord2.lat
    lon1 = coord1.long
    lon2 = coord2.long

    // thanks for this thing
    // https://www.movable-type.co.uk/scripts/latlong.html

    const R = 6371e3; // metres
    const thetaOne = lat1 * Math.PI / 180;
    const thetaTwo = lat2 * Math.PI / 180;
    const deltaTheta = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaTheta / 2) * Math.sin(deltaTheta / 2) +
        Math.cos(thetaOne) * Math.cos(thetaTwo) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d
}