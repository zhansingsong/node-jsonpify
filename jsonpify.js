#!/usr/bin/env node

const Koa = require('koa');
const logger = require('koa-logger');
const fetch = require('node-fetch');
const program = require('commander');
const chalk = require('chalk');
const address = require('address');
const detect = require('detect-port');

const app = new Koa();
let originArg;

program
  .version('0.0.1', '-v, --version')
  .arguments('<origin>')
  .action((origin) => {
    originArg = /\/$/.test(origin) ? origin.slice(0, -1) : origin; // remove tail slash
  })
  .usage(`${chalk.green('<origin>')} [options]`)
  .description(`${chalk.green('<origin>')}: origin of the server serving APIs `)
  .option('-p, --port [port]', 'set server port', 3232)
  .option('-n, --name [name]', 'set callback name', 'callback')
  .option('-C, --no-cache', 'disable cache', true)
  .on('--help', () => {
    console.log(`\n${chalk.bold('Examples:')}\n`);
    console.log(`  ${chalk.bold.yellow('$')} jsonpify http://example.com`);
    console.log(`  ${chalk.bold.yellow('$')} jsonpify http://example.com -p 8080 -n cb`);
    console.log(`  ${chalk.bold.yellow('$')} jsonpify http://example.com --port 8080 --name cb`);
    console.log();
  });

program.parse(process.argv);

app.use(logger());
if (typeof originArg === 'undefined') {
  console.error(
    chalk.redBright(`\nError: ${chalk.bold.green('<origin>')} argument is required!\n`),
  );
  program.help();
  process.exit(1);
}

const { name, port } = program;
app.use(async (ctx, next) => {
  await next();
  const cbvalue = ctx.query[name] || 'callback';
  await fetch(`${originArg}${ctx.url}`)
    .then(data => data.json())
    .then((data) => {
      ctx.body = `${cbvalue}(${JSON.stringify(data)})`;
      ctx.type = 'application/x-javascript;charset=utf-8';
    })
    .catch(() => console.error());
});
detect(port)
  .then((p) => {
    if (port == p) { // eslint-disable-line
      return port;
    }
    console.log(
      `${chalk.green(
        `Something is already running on port: ${chalk.red(
          port,
        )}. \nWould you like to run the proxy server on another port: ${chalk.yellowBright(
          p,
        )} instead?`,
      )}`,
    );
    return new Promise((res) => {
      const { stdin } = process;
      stdin.setEncoding('utf-8');
      stdin.on('data', (data) => {
        if (data.trim().toLocaleLowerCase() === 'y' || data === '\n') {
          res(p);
        } else {
          process.exit(0);
        }
      });
    });
  })
  .then((port) => { // eslint-disable-line
    app.listen(port, () => {
      console.log(
        `the proxy server on ${chalk.underline.gray(
          originArg,
        )} is running on port ${chalk.bold.green(port)} at localhost`,
      );
      console.log();
      console.log(`${chalk.bold.dim('->')}  ${chalk.underline.green(`http://localhost:${port}`)}`);
      console.log(
        `${chalk.bold.dim('->')}  ${chalk.underline.green(`http://${address.ip()}:${port}`)}`,
      );
      console.log();
    });
  });
