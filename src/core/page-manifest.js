/**
 * Route manifest for page-specific loading.
 *
 * New explorer pages can be added here without expanding long if/else chains.
 */

const DEFAULT_LEGACY_SCRIPTS = ['./data.js', './app.js'];

export const pageManifest = [
  {
    name: 'home',
    match: /(\/|index\.html)?$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['map', 'cuisines', 'festivals', 'culture', 'quiz'],
  },
  {
    name: 'cuisine',
    match: /cuisine\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['cuisines'],
  },
  {
    name: 'festivals',
    match: /festivals\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['festivals'],
  },
  {
    name: 'culture',
    match: /culture\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['culture'],
  },
  {
    name: 'dance',
    match: /dance\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['dance'],
  },
  {
    name: 'music',
    match: /music\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['music'],
  },
  {
    name: 'sports',
    match: /sports\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['sports'],
  },
  {
    name: 'science',
    match: /science\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['science'],
  },
  {
    name: 'personalities',
    match: /personalities\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['personalities'],
  },
  {
    name: 'spiritual',
    match: /spiritual\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['spiritual'],
  },
  {
    name: 'startup',
    match: /startup\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['startup'],
  },
  {
    name: 'heritage',
    match: /heritage\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['heritage'],
  },
  {
    name: 'monuments',
    match: /monuments\.html$/i,
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: ['monuments'],
  },
];

export function getCurrentPageConfig(pathname = window.location.pathname) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  return pageManifest.find((page) => page.match.test(cleanPath)) || {
    name: 'generic',
    legacyScripts: DEFAULT_LEGACY_SCRIPTS,
    dataModules: [],
  };
}
