export type AppRoute = 'home' | 'exam' | 'map' | 'explore';

function normalizeBasePath(basePath: string) {
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function resolveAppRoute(pathname: string, basePath: string): AppRoute {
  const base = normalizeBasePath(basePath);
  const relativePath = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\/+/, '');
  const [segment = ''] = relativePath.split('/').filter(Boolean);
  if (segment === 'exam') return 'exam';
  if (segment === 'map') return 'map';
  if (segment === 'explore') return 'explore';
  return 'home';
}
