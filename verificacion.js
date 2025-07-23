const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/hubot/slack/events', (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.send(req.body.challenge);
  }
  res.sendStatus(200);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor de verificación corriendo en puerto ${port}`);
});