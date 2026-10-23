import assert from 'node:assert/strict';
import test from 'node:test';
import { isNewerVersion, parseVersionManifest } from '../src/lib/app-version.ts';

test('isNewerVersion compares numeric major.minor.patch, not strings', () => {
  assert.equal(isNewerVersion('1.0.1', '1.0.0'), true);
  assert.equal(isNewerVersion('1.0.10', '1.0.9'), true);
  assert.equal(isNewerVersion('1.1.0', '1.0.99'), true);
  assert.equal(isNewerVersion('2.0.0', '1.99.99'), true);
});

test('isNewerVersion is false for equal, older, or malformed versions so rollbacks and bad data never prompt', () => {
  assert.equal(isNewerVersion('1.0.0', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.0', '1.0.1'), false);
  assert.equal(isNewerVersion('1.0', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.1-beta', '1.0.0'), false);
  assert.equal(isNewerVersion('latest', '1.0.0'), false);
  assert.equal(isNewerVersion('1.0.1', 'dev'), false);
});

test('parseVersionManifest accepts only an object with a valid version string', () => {
  assert.equal(parseVersionManifest({ version: '1.0.1' }), '1.0.1');
  assert.equal(parseVersionManifest({ version: '1.0.1', extra: true }), '1.0.1');
  assert.equal(parseVersionManifest({ version: 101 }), null);
  assert.equal(parseVersionManifest({ version: 'v1.0.1' }), null);
  assert.equal(parseVersionManifest({}), null);
  assert.equal(parseVersionManifest(null), null);
  assert.equal(parseVersionManifest('1.0.1'), null);
  assert.equal(parseVersionManifest([]), null);
});
