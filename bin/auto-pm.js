#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { startServer } = require('../src/server');

program
  .name('auto-pm')
  .description('An autonomous webhook orchestrator that securely bridges GitHub and Slack.')
  .version('1.0.0');

program.command('setup')
  .description('Set up the Auto-PM configuration files.')
  .action(() => {
    const envPath = path.join(process.cwd(), '.env');
    const examplePath = path.join(__dirname, '..', '.env.example');
    if (!fs.existsSync(envPath)) {
        if (fs.existsSync(examplePath)) {
            fs.copyFileSync(examplePath, envPath);
            console.log('\x1b[32mSuccessfully created .env file!\x1b[0m\nPlease open .env and add your Slack Webhook URL.');
        } else {
            console.log('\x1b[31mError: .env.example not found.\x1b[0m');
        }
    } else {
        console.log('\x1b[33mThe .env file already exists. You are good to go!\x1b[0m');
    }
  });

program.command('start')
  .description('Start the Auto-PM background webhook server.')
  .option('-p, --port <number>', 'Port to run the webhook listener on', '8000')
  .action((options) => {
    console.log(`\x1b[36mStarting Auto-PM Server on port ${options.port}...\x1b[0m`);
    console.log('Listening for GitHub webhooks...');
    startServer(parseInt(options.port));
  });

program.parse(process.argv);
