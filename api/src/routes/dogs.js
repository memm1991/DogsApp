const {Router} = require('express')
const router = Router()
const {getDogsbyId,getDogsbyName,createDogs,getAllDogs}= require('./controllers')


router.get('/',async (req,res)=>{
    if(req.query.name){
        
       let perros= await getDogsbyName(req.query.name)
       return  res.send(perros)
    }
    let todos=await getAllDogs()
    return res.send(todos)
})
router.post('/', async(req,res)=>{
    try{
        let {name,height,weight,life_span,temperament}=req.body[0]
        let response= await createDogs({name:name,height:height,weight:weight,life_span:life_span},temperament)
        res.send('perro creado')

    }catch(error){
        console.log(error)
    }})
router.get('/:idRaza', async(req,res)=>{
    try{
       
        let response= await getDogsbyId(req.params.idRaza)
        res.send(response)
    }catch(error){
        console.log(error)
    }
})    
    
        
       

    


module.exports=router