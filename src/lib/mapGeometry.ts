export const CLASSROOM_CONTINENTS = ['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Australia', 'Antarctica'] as const;
export type ClassroomContinent = (typeof CLASSROOM_CONTINENTS)[number];

type NaturalEarthFeature = { properties?: { CONTINENT?: unknown } | null; [key: string]: unknown };

export function classroomContinent(source: unknown): ClassroomContinent | null {
  if (source === 'Oceania') return 'Australia';
  return typeof source === 'string' && (CLASSROOM_CONTINENTS as readonly string[]).includes(source)
    ? (source as ClassroomContinent)
    : null;
}

export function groupFeaturesByContinent<T extends NaturalEarthFeature>(features: readonly T[]) {
  const grouped = Object.fromEntries(CLASSROOM_CONTINENTS.map((continent) => [continent, [] as T[]])) as Record<ClassroomContinent, T[]>;
  for (const feature of features) {
    const continent = classroomContinent(feature.properties?.CONTINENT);
    if (continent) grouped[continent].push(feature);
  }
  return grouped;
}
