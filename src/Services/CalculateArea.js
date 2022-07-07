var turf = require('@turf/turf')
export default class CalculateArea {
    static getErrorMessageFromResponse(data) {
        return turf.area(data)
    }
    static getDifference(f1, f2) {
        return turf.difference(f1, f2);
    }
}