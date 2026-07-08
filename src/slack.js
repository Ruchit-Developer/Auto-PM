const axios = require('axios');

async function sendSlackMessage(webhookUrl, message) {
    if (!webhookUrl) {
        console.error("Slack Webhook URL is empty.");
        return false;
    }
    
    try {
        await axios.post(webhookUrl, { text: message });
        console.log("Successfully sent message to Slack.");
        return true;
    } catch (error) {
        console.error(`Failed to send Slack message: ${error.message}`);
        return false;
    }
}

module.exports = { sendSlackMessage };
