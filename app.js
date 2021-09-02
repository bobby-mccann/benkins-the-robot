// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

const app = new App({
  token, signingSecret});

// All the room in the world for your code
const getChannelId = async channelName => {
  try {
    const conversations = await app.client.conversations.list({token});
    for (const channel of conversations.channels) {
      if (channel.name === channelName) {
        return channel.id;
      }
    }
  } catch (e) {
    console.error(e);
  }
}



(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');

  const channelId = getChannelId('bobbys-bot');
  console.log(channelId);
})();
