'use strict';


/**
 * Returns the type of the argument
 * @param {Any}    val    Value to be tested
 * @returns    {String}    type name for argument
 */
function getType (val) {
	if (typeof val === 'undefined') return 'undefined';
	if (typeof val === 'object' && !val) return 'null';
	return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}


// test for types
var out = [];

out.push(getType('string'));              // string
out.push(getType(9));                     // number
out.push(getType(true));                  // boolean
out.push(getType([]));                    // array
out.push(getType({}));                    // object
out.push(getType(null));                  // null
out.push(getType(undefined));             // undefined
out.push(getType(function(){}));          // function
out.push(getType(new Date()));            // date
out.push(getType(new RegExp('a-z')));     // regexp
out.push(getType(new Error()));           // error

console.log(out);
