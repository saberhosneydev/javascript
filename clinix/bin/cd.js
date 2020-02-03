#! /usr/bin/env node
var shell = require("shelljs");
var yargs = require("yargs").argv;

process.argv.forEach((val, index) => {
	if (index > 1) {
		if (val.includes('--')) {
		// 	// if the value is a key then don't handle it.
	}else {
		shell.exec(`cd c:`);
	}
}else {
		// just in case of errors
	}
});