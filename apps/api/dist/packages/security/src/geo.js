const earthRadiusMeters = 6371_000;
export function haversineDistanceMeters(a, b) {
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
export function isWithinRadius(center, point, radiusMeters) {
    return haversineDistanceMeters(center, point) <= radiusMeters;
}
