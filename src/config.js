require('dotenv').config();

const config = {
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || '',
    githubSecret: process.env.GITHUB_SECRET || ''
};

module.exports = config;
