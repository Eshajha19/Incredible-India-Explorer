import { readFileSync } from 'fs';
import { resolve } from 'path';

function assert(condition, message) {
    if (!condition) {
        console.error(`❌ ${message}`);
        process.exit(1);
    } else {
        console.log(`✓ ${message}`);
    }
}

// Mock DOM environment
globalThis.window = globalThis;
globalThis.document = {
    location: { pathname: '/cuisine.html' },
    addEventListener: (evt, listener) => {
        if (evt === 'app:route-changed') {
            globalThis.__routeListener = listener;
        }
    },
    dispatchEvent: () => {},
    createElement: () => ({ src: '', async: true, appendChild: () => {} }),
    head: { appendChild: () => {} }
};
globalThis.location = globalThis.document.location;

// Load router-init.js source
const routerInitPath = resolve('js-modules/router-init.js');
const code = readFileSync(routerInitPath, 'utf-8');
new Function(code)();

assert(typeof window.ROUTE_INIT_MAP === 'object', 'ROUTE_INIT_MAP is exported on window');
assert(typeof window.handleRouteInit === 'function', 'handleRouteInit is exported on window');

assert(window.ROUTE_INIT_MAP['cuisine.html'] !== undefined, 'cuisine.html route mapping exists');
assert(window.ROUTE_INIT_MAP['festivals.html'] !== undefined, 'festivals.html route mapping exists');
assert(window.ROUTE_INIT_MAP['science.html'] !== undefined, 'science.html route mapping exists');
assert(window.ROUTE_INIT_MAP['trip-planner.html'] !== undefined, 'trip-planner.html route mapping exists');

assert(typeof globalThis.__routeListener === 'function', 'app:route-changed listener registered');

console.log('\nAll router-init tests passed successfully!');
