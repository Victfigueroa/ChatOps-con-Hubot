const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Ruta para Slack events verification
app.post('/hubot/slack/events', (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.send(req.body.challenge);
  }
  res.sendStatus(200);
});

// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express escuchando en puerto ${port}`);
});

// Arranca Hubot como proceso hijo
const hubot = spawn('npx', ['hubot', '-a', 'shell'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname),
  shell: true,
});

hubot.on('close', (code) => {
  console.log(`Hubot salió con código ${code}`);
  process.exit(code);
});
