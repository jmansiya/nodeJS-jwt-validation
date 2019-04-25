//let redis = require('redis');
//let client = redis.createClient('6379', '127.0.0.1');
const Person = require('./Person');
let Redis = require('ioredis');
var bluebird = require("bluebird");
let client = bluebird.promisifyAll(new Redis(6379, '127.0.0.1'));

//let client = new Redis(6379, '127.0.0.1');



client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


let setValue = (index, value) => {
  client.set(index, value, Redis.print);
}

let getValue = async (index, persona) => {
  var result = await client.get(index);
  var obj = JSON.parse(result);
  persona = new Person(obj.nombre, obj.apellidos, obj.edad);

  console.log("HOLA " + persona.nombre);
  return persona;
}


module.exports = {
  setValue: setValue,
  getValue: getValue
}
