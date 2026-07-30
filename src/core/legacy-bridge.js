/**
 * Compatibility layer between the ES module entrypoint and legacy globals.
 */

import { loadScriptsInOrder } from './script-loader.js';

export async function loadLegacyBundleForPage(pageConfig) {
  const scripts = pageConfig.legacyScripts || [];

  if (!scripts.length) {
    return;
  }

  await loadScriptsInOrder(scripts);
}
