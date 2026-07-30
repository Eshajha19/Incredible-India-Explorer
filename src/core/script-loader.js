/**
 * Promise-based script loader for legacy browser globals.
 *
 * This lets the project shift to ES module ownership while keeping existing
 * global `data.js` and `app.js` behaviour intact during migration.
 */

const loadedScripts = new Map();

function resolveScriptUrl(src) {
  return new URL(src, window.location.href).href;
}

export function loadScript(src, { defer = true, module = false } = {}) {
  const resolved = resolveScriptUrl(src);

  if (loadedScripts.has(resolved)) {
    return loadedScripts.get(resolved);
  }

  const promise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-module-loader-src="${resolved}"]`);

    if (existing?.dataset.loaded === 'true') {
      resolve(existing);
      return;
    }

    const script = existing || document.createElement('script');
    script.src = resolved;
    script.defer = defer;
    script.dataset.moduleLoaderSrc = resolved;

    if (module) {
      script.type = 'module';
    }

    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve(script);
    }, { once: true });

    script.addEventListener('error', () => {
      loadedScripts.delete(resolved);
      reject(new Error(`Failed to load script: ${src}`));
    }, { once: true });

    if (!existing) {
      document.head.appendChild(script);
    }
  });

  loadedScripts.set(resolved, promise);
  return promise;
}

export async function loadScriptsInOrder(scripts) {
  for (const src of scripts) {
    await loadScript(src);
  }
}
