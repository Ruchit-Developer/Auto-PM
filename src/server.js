const express = require('express');
const { generateSummary } = require('./summarizer');
const { sendSlackMessage } = require('./slack');
const config = require('./config');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;
        const summary = generateSummary(payload);
        const success = await sendSlackMessage(config.slackWebhookUrl, summary);
        
        if (!success) {
            return res.status(500).json({ detail: "Failed to notify Slack" });
        }
        res.json({ status: "success", message: "Notification sent." });
    } catch (error) {
        res.status(400).json({ detail: "Invalid payload" });
    }
});

function startServer(port) {
    app.listen(port, () => {
        console.log(`Server is actively listening on port ${port}`);
    });
}

module.exports = { startServer, app };
