import fs from 'node:fs/promises';

import {request} from '@k03mad/request';
import {logErrorExit} from '@k03mad/simple-log';
import {globby} from 'globby';

const PLUGINS_DIR = './plugins';
const STORE_CONFIG = `${PLUGINS_DIR}/store.json`;

const CDN_DOMAIN = 'https://cdn.jsdelivr.net';
const PURGE_DOMAIN = 'https://purge.jsdelivr.net';
const PURGE_PATH = '/gh/k03mad/lampa/';
const PURGE_RPS = 1;

const [
    myPluginsFiles,
    storeConfig,
] = await Promise.all([
    globby(PLUGINS_DIR),
    fs.readFile(STORE_CONFIG, {encoding: 'utf8'}),
]);

const myCdnUrls = myPluginsFiles
    .map(link => PURGE_DOMAIN + PURGE_PATH + link);

if (myCdnUrls.length === 0) {
    logErrorExit(`Plugins CDN urls not found: ${PLUGINS_DIR}`);
}

const storeCdnUrls = JSON
    .parse(storeConfig)
    .results
    .flatMap(({results}) => results.map(({link}) => link.replace(CDN_DOMAIN, PURGE_DOMAIN)))
    .filter(link => link.includes(PURGE_DOMAIN));

if (storeCdnUrls.length === 0) {
    logErrorExit(`Store CDN urls not found: ${PLUGINS_DIR}`);
}

const urls = new Set([myCdnUrls, storeCdnUrls].flat());

await Promise.all([...urls].map(
    url => request(url, {}, {rps: PURGE_RPS}),
));
