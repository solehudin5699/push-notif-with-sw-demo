const express = require('express');
const app = express();
const webpush = require('web-push');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const apiKeys = {
  publicKey:
    'BMIsWnxIKP7VyelHgnbGp2tmffmPqueivKVhvxF-fqFq5KxffM0Kfb22-aVoVXWXL6f65MMSpPYmCCWbt0rzras',
  privateKey: 'Qns2Wr1yDyFL8KVDlRlQi3euLGI0GuyZlUIoIJAbR9s',
};

webpush.setVapidDetails('mailto:sol-xyz@yopmail.com', apiKeys.publicKey, apiKeys.privateKey);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let subData = [];
app.post('/save-subscription', (req, res) => {
  subData.push(req.body);
  console.log(req.body);
  res.json({
    status: 200,
    message: 'Subscription saved successfully.',
  });
});

app.get('/send-notification', (req, res) => {
  webpush.sendNotification(subData[0], 'Hello World');
  res.json({
    status: 200,
    message: 'Notification sent successfully.',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
