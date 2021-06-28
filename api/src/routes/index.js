const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsRoutes = require('./dogs')
const TempRoute = require('./temperaments')


const router = Router();
router.use('/dogs',DogsRoutes)
router.use('/temperament',TempRoute)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
