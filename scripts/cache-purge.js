import {request} from '@k03mad/request';
import {log} from '@k03mad/simple-log';
import {globby} from 'globby';

const PURGE_URL = 'https://purge.jsdelivr.net/gh/k03mad/lampa/';

const files = await globby('./public');

await Promise.all(files.map(async file => {
    const {body} = await request(PURGE_URL + file);
    log(JSON.stringify(body, 0, 2));
}));
