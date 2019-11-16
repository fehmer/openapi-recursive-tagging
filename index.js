'use strict';

const recurse = require('reftools/lib/recurse.js').recurse;

function process(src, options) {

    recurse(src.paths,{},function(obj,key,state) {
        if(obj["x-public"]) {
            handle(src, obj);
        }
    });

    return src;
};

function handle(src, obj) {
    recurse(obj,{},function(rec,key,state) {
        handleTags(src, rec);
            if(rec["$ref"]) {
                let path = rec["$ref"].substring(2).split('/');
                let reference = src;
                path.forEach(p => reference=reference[p]);
                mark(reference)
                handle(src, reference);
            }
        });
}


function handleTags(src, obj) {
    if(obj.tags) {
        obj.tags.forEach(activeTag => {
            if(src.tags) {
                src.tags
                    .filter(tag => tag.name == activeTag)
                    .forEach(tag => mark(tag) );
            }
            if(src["x-tagGroups"]) {
                 src["x-tagGroups"]
                    .filter(group => group.tags.includes(activeTag))
                    .forEach(group => mark(group) );
            }
        });
    }
}

function mark(src){
    src["x-public"] = true;
}

module.exports = {
    process : process
};