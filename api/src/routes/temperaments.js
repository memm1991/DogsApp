const {Router} = require('express')
const router = Router()
const{getTemperament}= require('./controllers')

router.get('/', async(req,res)=>{
    try{ let response =await getTemperament()
        return res.send(response)

    }catch(error){
        console.log(error)
    }
})
module.exports=router