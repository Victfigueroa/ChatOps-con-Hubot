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

app.listen(4000, () => {
  console.log('Servidor de verificación corriendo en puerto 4000');
});
 
