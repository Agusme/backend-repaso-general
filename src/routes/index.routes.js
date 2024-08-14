const {Router}= require ('express')
const router = Router()


router.use('/productos',require('./productos.routes'))
router.use('/usuarios', require('./user.routes'))
module.exports = router