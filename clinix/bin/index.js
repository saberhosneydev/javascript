#! /usr/bin/env node
var shell = require("shelljs");
var args = require("yargs").argv._;
var yargs = require("yargs").argv;
const path = require('path');

if (args[0] == "new") {
	shell.exec('mkdir ' + args[1]);
	process.chdir(args[1]);
	shell.exec('echo simple write mode > simple.txt');
	shell.exec('echo done ..');
	if (yargs.git) {
		shell.exec('git init');
	}
	// type part goes here ex --type=php
}

if (args[0] == "remote") {
	if (yargs.github) {
		shell.exec(`git remote add origin https://github.com/${args[1]}/${args[2]}.git`);
	}else if(yargs.bitbucket) {

	}
}

if (args[0] == "push") {
	shell.exec('git add .');
	shell.exec(`git commit -am ${args[1]}`);
	shell.exec(path.resolve(__dirname  + '/g.bat'));
}