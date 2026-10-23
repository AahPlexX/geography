export type GeoEntityKind = 'continent' | 'country';

export type GeoEntitySource = {
  dataset: 'natural-earth-50m-admin0';
  id: string;
};

export type GeoEntity = {
  id: string;
  kind: GeoEntityKind;
  name: string;
  aliases: string[];
  parentIds: string[];
  source: GeoEntitySource;
  bbox: [number, number, number, number] | null;
  centroid: [number, number] | null;
  properties: Record<string, string>;
};

export type GeoEntityIndex = {
  version: 1;
  entities: GeoEntity[];
};

export type ExplorerFoundationManifest = {
  version: 1;
  processingVersion: 1;
  source: {
    url: string;
    sha256: string;
    featureCount: number;
  };
  output: {
    path: 'data/explorer/entities.json';
    sha256: string;
    recordCount: number;
  };
};
