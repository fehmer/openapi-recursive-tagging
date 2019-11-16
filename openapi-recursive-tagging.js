'use strict';

const fs = require('fs');
const yaml = require('yaml');
const tagger = require('./index.js');

let argv = require('yargs')
    .usage('Usage: openapi-recursive-tagging [options] {infile} [{outfile}]')
    .demand(1)
    .strict()
    .help('h')
    .alias('h', 'help')
    .version()
    .argv;

let s = fs.readFileSync(argv._[0],'utf8');
let obj = yaml.parse(s);

let res = tagger.process(obj,argv);


if (argv._[0].indexOf('.json')>=0) {
    s = JSON.stringify(res,null,2);
}
else {
    s = yaml.stringify(res);
}
if (argv._.length>1) {
    fs.writeFileSync(argv._[1],s,'utf8');
}
else {
    console.log(s);
}