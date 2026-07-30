/**
 * Incredible India Explorer modular bootstrap.
 *
 * Loaded with <script type="module">. It moves script ownership from HTML into
 * a focused module layer and delegates route-specific loading through a manifest.
 */

import { onReady } from './dom-ready.js';
import { getCurrentPageConfig } from './page-manifest.js';
import { loadLegacyBundleForPage } from './legacy-bridge.js';

onReady(async () => {
  const pageConfig = getCurrentPageConfig(window.location.pathname);

  document.documentElement.dataset.moduleBootstrap = 'ready';
  document.documentElement.dataset.pageModule = pageConfig.name;

  try {
    await loadLegacyBundleForPage(pageConfig);

    window.dispatchEvent(new CustomEvent('india:modules-ready', {
      detail: {
        page: pageConfig.name,
        scripts: pageConfig.legacyScripts,
        dataModules: pageConfig.dataModules,
      },
    }));
  } catch (error) {
    console.error('[Incredible India] Modular bootstrap failed:', error);

    window.dispatchEvent(new CustomEvent('india:modules-error', {
      detail: { page: pageConfig.name, error },
    }));
  }
});
