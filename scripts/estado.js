module.exports = (robot) => {
  robot.router.get('/estado', (req, res) => {
    res.send('El backend est� corriendo y saludable');
  });

  robot.respond(/estado del servicio/i, (res) => {
    res.send('El backend est� corriendo y saludable');
  });
};
