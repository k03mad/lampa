import {request} from '@k03mad/request';
import {logErrorExit} from '@k03mad/simple-log';
import {globby} from 'globby';

const PLUGINS_DIR = './plugins';

const PURGE_URL = 'https://purge.jsdelivr.net/gh/k03mad/lampa/';
const PURGE_RPS = 1;

const files = await globby(PLUGINS_DIR);

if (files.length === 0) {
    logErrorExit(`Files not found at dir: ${PLUGINS_DIR}`);
}

await Promise.all(files.map(path => request(PURGE_URL + path, {}, {rps: PURGE_RPS})));
