/**
 * Lazy data registry.
 *
 * This is the migration point for extracting datasets out of the existing
 * monolithic data.js into granular ES modules.
 */

const loaders = {
  map: () => import('./map-data.js'),
  cuisines: () => import('./cuisines-data.js'),
  festivals: () => import('./festivals-data.js'),
  culture: () => import('./culture-data.js'),
  quiz: () => import('./quiz-data.js'),
};

export function hasDataModule(name) {
  return Object.prototype.hasOwnProperty.call(loaders, name);
}

export async function loadDataModule(name) {
  if (!hasDataModule(name)) {
    throw new Error(`Unknown data module: ${name}`);
  }

  return loaders[name]();
}

export async function loadDataModules(names = []) {
  const entries = await Promise.all(
    names.filter(hasDataModule).map(async (name) => [name, await loadDataModule(name)])
  );

  return Object.fromEntries(entries);
}
