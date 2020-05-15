#!/usr/bin/env node

const readline = require('readline');

const label = '_cse_tkgr0fk0iv5';
const score = '1.000000';

// print header
console.log('URL\tLabel\tScore');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	// grab the url after HREF=
	const re = new RegExp(/.*HREF="([^"]*)".*/);
	const match = line.match(re);
	
	// not all lines contain URLs
	if (match) {
		const url = new URL(match[1]);
		// take the last two parts of the domain
		const [secondLevelDomain, topLevelDomain] = url.hostname.split('.').slice(-2);
		// produce "*.blabla.com/*"
		const sitePattern = `*.${secondLevelDomain}.${topLevelDomain}/*`;
		
		console.log(`${sitePattern}\t${label}\t${score}`);
	}
});
