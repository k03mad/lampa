import {request} from '@k03mad/request';
import {globby} from 'globby';

const PUBLIC_DIR = './public';

const PURGE_URL = 'https://purge.jsdelivr.net/gh/k03mad/lampa/';
const PURGE_RPS = 1;

const purgeRequest = file => request(PURGE_URL + file, {}, {rps: PURGE_RPS});

const files = await globby(PUBLIC_DIR);
await Promise.all(files.map(purgeRequest));
