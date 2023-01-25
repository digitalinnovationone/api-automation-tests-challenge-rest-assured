#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const os_1 = require("os");
const fs_1 = require("fs");
const path_1 = require("path");
const guards_1 = require("./guards");
const run = require("json-server/lib/cli/run");
const jsonServerPkg = require("json-server/package.json");
// Get the json-server cli module and add our middlewares.
// It's inside a closure in the json-server source code, so we unfortunately have to duplicate it.
// https://github.com/typicode/json-server/blob/master/src/cli/index.js
const argv = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
    port: { alias: 'p', description: 'Set port', default: 3000 },
    host: { alias: 'H', description: 'Set host', default: 'localhost' },
    watch: { alias: 'w', description: 'Watch file(s)' },
    routes: { alias: 'r', description: 'Path to routes file' },
    middlewares: { alias: 'm', array: true, description: 'Paths to middleware files' },
    static: { alias: 's', description: 'Set static files directory' },
    'read-only': { alias: 'ro', description: 'Allow only GET requests' },
    'no-cors': { alias: 'nc', description: 'Disable Cross-Origin Resource Sharing' },
    'no-gzip': { alias: 'ng', description: 'Disable GZIP Content-Encoding' },
    snapshots: { alias: 'S', description: 'Set snapshots directory', default: '.' },
    delay: { alias: 'd', description: 'Add delay to responses (ms)' },
    id: { alias: 'i', description: 'Set database id property (e.g. _id)', default: 'id' },
    foreignKeySuffix: {
        alias: 'fks',
        description: 'Set foreign key suffix (e.g. _id as in post_id)',
        default: 'Id',
    },
    quiet: { alias: 'q', description: 'Suppress log messages from output' },
    config: { alias: 'c', description: 'Path to config file', default: 'json-server.json' },
})
    .boolean('watch')
    .boolean('read-only')
    .boolean('quiet')
    .boolean('no-cors')
    .boolean('no-gzip')
    .string('routes')
    .help('help')
    .alias('help', 'h')
    .version(jsonServerPkg.version)
    .alias('version', 'v')
    .example('$0 db.json', '')
    .example('$0 file.js', '')
    .example('$0 http://example.com/db.json', '')
    .epilog('https://github.com/typicode/json-server\nhttps://github.com/jeremyben/json-server-auth')
    .require(1, 'Missing <source> argument').argv;
// Add our index path to json-server middlewares.
if (argv.middlewares) {
    argv.middlewares.unshift(__dirname);
}
else {
    argv.middlewares = [__dirname];
}
// Adds guards to json-server routes.
// We are forced to create an intermediary file:
// https://github.com/typicode/json-server/blob/master/src/cli/run.js#L109
if (argv.routes) {
    let routes = JSON.parse(fs_1.readFileSync(argv.routes, 'utf8'));
    routes = guards_1.parseGuardsRules(routes);
    routes = JSON.stringify(routes);
    const tmpFilepath = path_1.join(os_1.tmpdir(), `routes-from-${path_1.basename(process.cwd())}.json`);
    fs_1.writeFileSync(tmpFilepath, routes, 'utf8');
    argv.routes = tmpFilepath;
}
// But we won't be able to properly watch and reload custom routes:
// https://github.com/typicode/json-server/blob/master/src/cli/run.js#L229
// launch json-server
run(argv);
