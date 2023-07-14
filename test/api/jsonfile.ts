import {readFileSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

export const readJSONSync = (path: string, metaUrl: string) => JSON.parse(readFileSync(join(dirname(fileURLToPath(metaUrl)), path), 'utf-8'));
export const readSpecs = (path: string, metaUrl: string) => readJSONSync('../../../../specs/' + path, metaUrl)