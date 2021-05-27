const firefox = process.argv.includes('--firefox') ? 'FIREFOX' : '';
const edge = process.argv.includes('--edge') ? 'EDGE' : '';

const browser = firefox || edge || 'CHROME';

require('ts-node').register({ transpileOnly: true });

module.exports = require(`./e2e/config/wdio.${browser}.conf.ts`);
