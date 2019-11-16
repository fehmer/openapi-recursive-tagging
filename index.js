'use strict';

const recurse = require('reftools/lib/recurse.js').recurse;

function process(src, options) {
    recurse(src,{},function(obj,key,state) {
        if(obj["x-public"]) {
            recurse(obj,{},function(rec,key,state) {
                if(rec["$ref"]){
                    let path = rec["$ref"].substring(2).split('/');
                    let reference = src;
                    path.forEach(p => reference=reference[p]);
                    reference["x-public"] = true;
                }
            });
        }
    });
    return src;
};

module.exports = {
    process : process
};