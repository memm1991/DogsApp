require('dotenv').config();
const { Sequelize, UUID } = require('sequelize');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,API_KEY,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog,Temperament } = sequelize.models;

// Aca vendrian las relaciones
Dog.belongsToMany(Temperament,{through:'DogTemp'})
Temperament.belongsToMany(Dog,{through:'DogTemp'})

async function getallTemp(){
  try{
    let todo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let ttemp=[] 
    // console.log(todo.data[0].temperament)
    todo.data.forEach(dog=>{
      // console.log(dog.temperament.split(','))
      if(dog.temperament){
        let tempStr = dog.temperament.replace(/\s/g, "").toLowerCase();
        let s=tempStr.split(',')
       ttemp.push(...s)//
      }
    })
    // console.log(ttemp)
    let settem= new Set (ttemp)
    // console.log(settem)
    let final =[]
     settem.forEach(temp=>final.push({name: temp}))
    // console.log(final)
    await Temperament.bulkCreate(final)
    //con un map, generar un array de objeto con spread operators donde debo hacer un id=new uuid
  }
  catch (error){
    console.log(error)
  }

}

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,    // para importart la conexión { conn } = require('./db.js');
  getallTemp,
};
