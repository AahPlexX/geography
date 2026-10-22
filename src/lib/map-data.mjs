export const NATURAL_EARTH_SOURCE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_50m_admin_0_countries.geojson';

export function validateNaturalEarth(value) {
  if (!value || value.type !== 'FeatureCollection' || !Array.isArray(value.features) || value.features.length < 150) return false;
  return value.features.every((feature) => {
    const properties = feature?.properties;
    return feature?.type === 'Feature' && typeof properties?.CONTINENT === 'string' && typeof properties?.NAME === 'string' && feature?.geometry;
  });
}

export function compactNaturalEarth(value) {
  if (!validateNaturalEarth(value)) throw new TypeError('Invalid Natural Earth feature collection.');
  return {
    type: 'FeatureCollection',
    features: value.features.map((feature) => ({
      type: 'Feature',
      properties: {
        CONTINENT: feature.properties.CONTINENT,
        NAME: feature.properties.NAME,
        ADM0_A3: feature.properties.ADM0_A3,
      },
      geometry: feature.geometry,
    })),
  };
}
