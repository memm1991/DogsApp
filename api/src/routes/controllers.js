require('dotenv').config();
const {Dog,Temperament}= require('../db')
const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const { response } = require('express');
const {API_KEY} = process.env;
const { Op } = require("sequelize");
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

  async function getAllDogs(){

try{
  let lodelapi=  await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  
  let lodebase= await Dog.findAll({include:{
    model:Temperament
  }})
  let finalbase=[]
  for(let j=0;j<lodebase.length;j++){
    finalbase.push({
      id:lodebase[j].dataValues.id,
     name:lodebase[j].dataValues.name,
     weight:lodebase[j].dataValues.weight,
     height:lodebase[j].dataValues.height,
     life_span:lodebase[j].dataValues.life_span,
     temperament:lodebase[j].dataValues.Temperaments.map((temperamento) => temperamento.getDataValue('name')).join()
    })
     

  }
  let finalapi=[]
 for(let i =0 ;i<lodelapi.data.length;i++){
   finalapi.push({
     id:lodelapi.data[i].id,
     name:lodelapi.data[i].name,
     weight:lodelapi.data[i].weight.metric,
     height:lodelapi.data[i].height.metric,
     life_span:lodelapi.data[i].life_span,
     image:lodelapi.data[i].image.url,
     temperament:lodelapi.data[i].temperament
   })
 }
 return [...finalapi,...finalbase]

}catch (error){
 console.error(error)
 }
}


 
  


async function getDogsbyName(name){
  try{ 
    let filtrar=await getAllDogs()
    let final=[]
    filtrar.forEach(el=>el.name.toLowerCase().indexOf(name.toLowerCase())>-1?final.push(el):false)
    return final
  }catch(error){
    console.log(error)
  }
 }
  
    
    


  
async function getDogsbyId(id){
  try{
    console.log(id)
    let alldogs = await getAllDogs()
    console.log(alldogs)
    let respo= alldogs.find(el=>el.id==id)
    console.log(respo)
    return respo
  }catch(error){
    console.log(error)
  }
    

}
 async function getTemperament (){
   try{
     let allTemp= await Temperament.findAll()
     return allTemp
   }catch(error){
     console.log(error)
   }
    
}
     

 async function createDogs(dog,temperament){
   try{
    let Dogy=await Dog.create(dog)
    let temparray=[]
    
    let j;
    for(i=0; i<temperament.length;i++){
      j= await Temperament.findOrCreate({
        where:temperament[i]
      })
      temparray.push(j[0])
    }
   
    temparray.forEach(async el=> {await Dogy.addTemperament(el)})
   }catch(error){
     console.log(error)
   }
}


module.exports={
    getDogsbyId,
    getDogsbyName,
    getTemperament,
    createDogs,
    getAllDogs,
}
