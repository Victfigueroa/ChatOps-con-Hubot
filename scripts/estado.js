module.exports = (robot) => {
  robot.router.get('/estado', (req, res) => {
    res.send('El backend está corriendo y saludable');
  });

  robot.respond(/estado del servicio/i, (res) => {
    res.send('El backend está corriendo y saludable');
  });
};
