const VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

function parseVersion(value: string) {
  const match = VERSION_PATTERN.exec(value);
  return match ? ([Number(match[1]), Number(match[2]), Number(match[3])] as const) : null;
}

// version.json is fetched at runtime and untrusted: accept only a plain major.minor.patch string.
export function parseVersionManifest(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null;
  const { version } = data as { version?: unknown };
  return typeof version === 'string' && parseVersion(version) ? version : null;
}

// Strictly newer only, so a stale CDN edge or a rollback never prompts the learner to "update" backwards.
export function isNewerVersion(candidate: string, current: string): boolean {
  const next = parseVersion(candidate);
  const now = parseVersion(current);
  if (!next || !now) return false;
  for (let i = 0; i < 3; i += 1) {
    if (next[i] !== now[i]) return next[i]! > now[i]!;
  }
  return false;
}
