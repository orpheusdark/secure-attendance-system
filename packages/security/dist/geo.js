"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversineDistanceMeters = haversineDistanceMeters;
exports.isWithinRadius = isWithinRadius;
const earthRadiusMeters = 6371_000;
function haversineDistanceMeters(a, b) {
    const toRadians = (value) => (value * Math.PI) / 180;
    const deltaLatitude = toRadians(b.latitude - a.latitude);
    const deltaLongitude = toRadians(b.longitude - a.longitude);
    const latitudeA = toRadians(a.latitude);
    const latitudeB = toRadians(b.latitude);
    const sinDeltaLat = Math.sin(deltaLatitude / 2);
    const sinDeltaLng = Math.sin(deltaLongitude / 2);
    const angle = sinDeltaLat ** 2 + Math.cos(latitudeA) * Math.cos(latitudeB) * sinDeltaLng ** 2;
    return 2 * earthRadiusMeters * Math.asin(Math.sqrt(angle));
}
function isWithinRadius(center, point, radiusMeters) {
    return haversineDistanceMeters(center, point) <= radiusMeters;
}
