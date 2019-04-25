let jwt = require('jsonwebtoken');
let redisCliente = require('./redisofile');
const config = require('./config.js');
let Person = require('./Person');

let checkToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    var persona1 = null;

    await jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log("Decoded: " + decoded);
        console.log("username: " + decoded.username);
        var persona = await redisCliente.getValue("Jose");

        console.log("Persona obtenida DENTRO: ");
        console.log("Nombre: " + persona.nombre);
        console.log("Apellidos: " + persona.apellidos);
        console.log("Edad: " + persona.edad);

        persona1 = persona;
        req.decoded = decoded;
        next();
      }
    });

    console.log("Persona obtenida FUERA: ");
    console.log("Nombre: " + persona1.nombre);
    console.log("Apellidos: " + persona1.apellidos);
    console.log("Edad: " + persona1.edad);
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
