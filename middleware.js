let jwt = require('jsonwebtoken');
let redisCliente = require('./redisofile');
const config = require('./config.js');
let Person = require('./Person');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log("Decoded: " + decoded);
        console.log("username: " + decoded.username);
        let persona = redisCliente.getValue("Jose");
        //console.log("Token obtenido : " + variableFromRedis);

        console.log("Persona obtenida RECIBIDA: ");
        console.log("Nombre: " + persona.nombre);
        console.log("Apellidos: " + persona.apellidos);
        console.log("Edad: " + persona.edad);

        req.decoded = decoded;
        next();
      }
    });
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
