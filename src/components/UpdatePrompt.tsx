import { useEffect, useState } from 'react';
import { isNewerVersion, parseVersionManifest } from '../lib/app-version';

const CHECK_INTERVAL_MS = 5 * 60 * 1000;
const DISMISSED_KEY = 'geography-study-lab:dismissed-update';

function readDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISSED_KEY);
  } catch {
    return null;
  }
}

function writeDismissed(version: string) {
  try {
    window.sessionStorage.setItem(DISMISSED_KEY, version);
  } catch {
    // Storage can be blocked; the prompt then simply reappears on the next check.
  }
}

async function fetchDeployedVersion(signal: AbortSignal) {
  const response = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, { cache: 'no-store', signal });
  return response.ok ? parseVersionManifest(await response.json()) : null;
}

export function UpdatePrompt() {
  const [available, setAvailable] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const check = async () => {
      try {
        const deployed = await fetchDeployedVersion(controller.signal);
        if (deployed && isNewerVersion(deployed, __APP_VERSION__) && deployed !== readDismissed()) setAvailable(deployed);
      } catch {
        // Offline, blocked, or not a manifest (e.g. dev server): stay silent and keep the app usable.
      }
    };
    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') void check();
    };

    void check();
    const timer = window.setInterval(checkWhenVisible, CHECK_INTERVAL_MS);
    document.addEventListener('visibilitychange', checkWhenVisible);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', checkWhenVisible);
    };
  }, []);

  if (!available) return null;

  const cancel = () => {
    writeDismissed(available);
    setAvailable(null);
  };

  return (
    <dialog ref={(dialog) => { if (dialog && !dialog.open) dialog.showModal(); }} className="app-dialog" aria-labelledby="update-prompt-title" onClose={cancel}>
      <div className="dialog-body">
        <div className="dialog-heading"><div><p>Update available</p><h2 id="update-prompt-title">Version {available} is now available</h2></div></div>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={cancel}>Cancel</button>
          <button type="button" className="primary-button" onClick={() => window.location.reload()}>Update</button>
        </div>
      </div>
    </dialog>
  );
}
