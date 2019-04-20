let redis = require('redis');
const Person = require('./Person');
let client = redis.createClient('6379', '127.0.0.1');

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


let setValue = (index, value) => {
  client.set(index, value, redis.print);
}

let getValue = (index) => {
  var persona = undefined;
  client.get(index, function (error, result) {
      if (error) {
          console.log(error);
          throw error;
      }
      console.log('GET result ->' + result);
      var obj = JSON.parse(result);
      //{"nombre":"Jose","apellidos":"Mansilla Garcia-Gil","edad":37}

      persona = new Person(obj.nombre, obj.apellidos, obj.edad);
  });

  console.log("HOLA " + persona.nombre);
  return persona;
}


module.exports = {
  setValue: setValue,
  getValue: getValue
}
